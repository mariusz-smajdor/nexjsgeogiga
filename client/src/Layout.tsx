import { Outlet } from 'react-router-dom';

import { Header } from './components/layout/header/Header';

function Layout() {
  return (
    <>
      <Header />
      <main className='container flex min-h-screen items-center justify-center'>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
