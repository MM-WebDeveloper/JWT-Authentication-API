import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [register] = useRegisterMutation();
	const navigate = useNavigate();

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				console.log('form submitted');
				console.log(email, password);
				const res = await register({
					variables: {
						email,
						password,
					},
				});

				navigate('/');
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
			<button type='submit'>register</button>
		</form>
	);
};
