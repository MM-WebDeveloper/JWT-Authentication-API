import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { authValidator } from '../helpers/Auth';
import { ContextType } from '../types/ContextType';

@Resolver()
export class HelloResolver {
	@Query(() => String)
	hello() {
		return 'hello';
	}

	@Query(() => String)
	@UseMiddleware(authValidator)
	bye(@Ctx() { payload }: ContextType) {
		console.log(payload);
		return `your user id is: ${payload!.userId}`;
	}
}
