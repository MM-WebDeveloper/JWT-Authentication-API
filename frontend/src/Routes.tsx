import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ProtectedPage } from './pages/ProtectedPage';
import { Register } from './pages/Register';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<header>
				<div>
					<Link to='/'>home</Link>
				</div>
				<div>
					<Link to='/register'>register</Link>
				</div>
				<div>
					<Link to='/login'>login</Link>
				</div>
				<div>
					<Link to='/protected'>secret data</Link>
				</div>
			</header>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/protected' element={<ProtectedPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
