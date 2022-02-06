import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './Routes';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/react-hooks';
import { getAccessToken } from './accessToken';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
	const token = getAccessToken();

	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppRoutes />
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
