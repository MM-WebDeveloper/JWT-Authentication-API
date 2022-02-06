import 'reflect-metadata';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { HelloResolver } from './resolvers/HelloResolver';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createConnection } from 'typeorm';
import express from 'express';
import { RegisterResolver } from './resolvers/RegisterResolver';
import { UserResolver } from './resolvers/UserResolver';
import { LoginResolver } from './resolvers/LoginResolver';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { User } from './entities/User';
import { createAccessToken, createRefreshToken } from './helpers/Auth';

const run = async () => {
	const PORT = process.env.PORT || 4000;

	const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
		resolvers: [HelloResolver, RegisterResolver, LoginResolver, UserResolver],
	});

	const app = express();
	app.use(cookieParser());

	app.post('/refresh_token', async (req, res) => {
		const token = req.cookies.jid;

		if (!token) {
			return res.send({ ok: false, accessToken: '' });
		}

		let payload: any = null;

		try {
			payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

			const user = await User.findOne({ id: payload.userId });

			if (!user) {
				return res.send({ ok: false, accessToken: '' });
			}

			if (user.tokenVersion !== payload.tokenVersion) {
				return res.send({ ok: false, accessToken: '' });
			}

			res.cookie('jid', createRefreshToken(user), {
				httpOnly: true,
			});

			return res.send({ ok: true, accessToken: createAccessToken(user) });
		} catch (error) {
			console.log(error);
			return res.send({ ok: false, accessToken: '' });
		}
	});

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
		context: ({ req, res }) => ({
			req,
			res,
		}),
	});

	await createConnection().then(() => console.log('Connected to database...'));

	await apolloServer.start();

	apolloServer.applyMiddleware({
		app,
		cors: {
			credentials: true,
			origin: 'http://localhost:3000',
		},
	});

	app.listen(PORT, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
		);
	});
};

run();
