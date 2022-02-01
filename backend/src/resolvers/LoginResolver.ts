import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { ContextType } from '../types/ContextType';
import { createAccessToken, createRefreshToken } from '../helpers/Auth';

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
}

@Resolver()
export class LoginResolver {
	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: ContextType
	): Promise<LoginResponse> {
		try {
			const user = await User.findOne({ where: { email } });

			if (!user) {
				throw new Error('user not found');
			}

			const valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				throw new Error('invalid login credentials');
			}

			ctx.res.cookie('jid', createRefreshToken(user), {
				httpOnly: true,
			});

			return {
				accessToken: createAccessToken(user),
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
