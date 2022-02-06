import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { authValidator } from '../helpers/Auth';
import { ContextType } from '../types/ContextType';

@Resolver()
export class ProtectedRouteResolver {
	@Query(() => String)
	@UseMiddleware(authValidator)
	protectedRoute(@Ctx() { payload }: ContextType) {
		return `your user id is: ${payload!.userId}`;
	}
}
