import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	public id: number;

	@Column('text')
	@Field()
	public email: string;

	@Column('text')
	public password: string;

	@Column('int', { default: 0 })
	tokenVersion: number;
}
