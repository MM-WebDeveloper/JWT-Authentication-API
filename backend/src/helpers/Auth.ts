import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { ContextType } from '../types/ContextType';

export const createAccessToken = (user: User) => {
	return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '1d',
	});
};

export const createRefreshToken = (user: User) => {
	return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	});
};

export const authValidator: MiddlewareFn<ContextType> = ({ context }, next) => {
	const authorization = context.req.headers['authorization'];

	if (!authorization) {
		throw new Error('not authenticated');
	}

	try {
		const token = authorization.split(' ')[1];
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		context.payload = payload as any;
	} catch (error) {
		console.log(error.message);
		throw new Error('not authenticated');
	}

	return next();
};
