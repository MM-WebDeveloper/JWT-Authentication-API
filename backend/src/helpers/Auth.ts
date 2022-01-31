import { User } from '../entities/User';
import jwt from 'jsonwebtoken';

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
