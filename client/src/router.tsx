import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/main-layout';
import AuthLayout from '@/layouts/auth-layout';
import { SignInForm } from './pages/signin';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { index: true, element: <SignInForm /> },
          { path: 'signin', element: <SignInForm /> },
          { path: 'signup', element: <p>SignUp</p> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <p>Page not found</p>,
  },
]);
