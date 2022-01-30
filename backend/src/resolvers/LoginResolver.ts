import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ContextType } from '../types/ContextType';

@ObjectType()
class LoginResposne {
	@Field()
	accessToken: string;
}

@Resolver()
export class LoginResolver {
	@Mutation(() => LoginResposne)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: ContextType
	): Promise<LoginResposne> {
		try {
			const user = await User.findOne({ where: { email } });

			if (!user) {
				throw new Error('user not found');
			}

			const valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				throw new Error('invalid login credentials');
			}

			ctx.res.cookie(
				'jid',
				jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
					expiresIn: '7d',
				}),
				{
					httpOnly: true,
				}
			);

			return {
				accessToken: jwt.sign(
					{ userId: user.id },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: '365d',
					}
				),
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
