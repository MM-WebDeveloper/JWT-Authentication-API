import { Arg, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async users(): Promise<User[]> {
		return User.find();
	}
}
