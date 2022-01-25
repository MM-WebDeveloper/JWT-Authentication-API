import 'reflect-metadata';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { HelloResolver } from './resolvers/HelloResolver';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createConnection } from 'typeorm';
import express from 'express';
import { RegisterResolver } from './resolvers/RegisterResolver';

const run = async () => {
	const PORT = process.env.PORT || 4000;

	const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
		resolvers: [HelloResolver, RegisterResolver],
	});

	const app = express();

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
	});

	await createConnection().then(() => console.log('Connected to database...'));

	await apolloServer.start();

	apolloServer.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
		);
	});
};

run();
