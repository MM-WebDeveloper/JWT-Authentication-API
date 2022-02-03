import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async users(): Promise<User[]> {
		return User.find();
	}

	@Mutation(() => Boolean)
	async revokeRefreshToken(@Arg('userId', () => Int) userId: number) {
		await getConnection()
			.getRepository(User)
			.increment({ id: userId }, 'tokenVersion', 1);

		return true;
	}
}
