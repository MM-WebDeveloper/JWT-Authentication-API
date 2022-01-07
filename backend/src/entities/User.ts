import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
	@Field()
	public email: string;

	@Field()
	public username: string;

	constructor(email: string, username: string) {
		this.email = email;
		this.username = username;
	}
}
