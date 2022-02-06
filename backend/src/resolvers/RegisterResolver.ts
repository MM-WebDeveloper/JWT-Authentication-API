import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

@Resolver()
export class RegisterResolver {
	@Mutation(() => Boolean)
	async register(
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<Boolean> {
		const hashedPassword = await bcrypt.hash(password, 12);

		try {
			const user = await User.findOne({ email });

			if (user) {
				throw new Error('invalid email');
			}
			await User.insert({
				email,
				password: hashedPassword,
			});
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}
}
