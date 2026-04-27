import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/main-layout';
import AuthLayout from '@/layouts/auth-layout';
import NotFound from '@/pages/not-found';
import SignInForm from '@/pages/signin';
import SignUpForm from '@/pages/signup';

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				element: <AuthLayout />,
				children: [
					{ index: true, element: <SignInForm /> },
					{ path: 'signin', element: <SignInForm /> },
					{ path: 'signup', element: <SignUpForm /> },
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);
