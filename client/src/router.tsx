import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/main-layout';
import AuthLayout from '@/layouts/auth-layout';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { index: true, element: <p>Sign In</p> },
          { path: 'signin', element: <p>Sign In</p> },
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
