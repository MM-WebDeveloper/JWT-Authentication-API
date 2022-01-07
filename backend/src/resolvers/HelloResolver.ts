import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
	@Query(() => String)
	hello() {
		return 'hello moshi moshi';
	}
}
