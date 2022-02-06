import React from 'react';
import { useUsersQuery } from '../generated/graphql';

interface Props {}

export const Home: React.FC<Props> = () => {
	const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' });

	if (loading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div>users: </div>
			<ul>
				{data.users.map((user) => (
					<li key={user.id}>
						{user.id} {user.email}
					</li>
				))}
			</ul>
		</div>
	);
};
