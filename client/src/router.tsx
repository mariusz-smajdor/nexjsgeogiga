import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout.tsx';
import HomePage from './pages/home/Home.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '*',
    element: <p>Page not found</p>, // Todo: Create a proper NotFoundPage component
  },
]);
