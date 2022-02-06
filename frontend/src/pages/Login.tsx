import { responsePathAsArray } from 'graphql';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLoginMutation } from '../generated/graphql';

interface Props {}

export const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login] = useLoginMutation();
	const navigate = useNavigate();

	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const res = await login({
						variables: {
							email,
							password,
						},
					});

					console.log(res.data?.login.accessToken);
					if (res && res.data) {
						console.log('token set');
						setAccessToken(res.data.login.accessToken);
					}
				}}
			>
				<div>
					<input
						value={email}
						placeholder='email'
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</div>
				<div>
					<input
						value={password}
						placeholder='password'
						type='password'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};
