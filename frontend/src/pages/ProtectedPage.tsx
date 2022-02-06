import React from 'react';
import { useProtectedRouteQuery } from '../generated/graphql';

interface Props {}

export const ProtectedPage: React.FC<Props> = () => {
	const { data, loading, error } = useProtectedRouteQuery();

	if (loading) {
		return <div>loading....</div>;
	}

	if (error) {
		console.log(error);
		return <div>error</div>;
	}

	if (!data) {
		return <div>no data</div>;
	}
	return <div>{data?.protectedRoute}</div>;
};
