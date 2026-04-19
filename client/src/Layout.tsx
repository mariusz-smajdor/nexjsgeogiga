import { Outlet } from 'react-router-dom';

import { Header } from '@/components/layout/header';

function Layout() {
  return (
    <>
      <Header />
      <main className='container flex h-dvh flex-col items-center justify-evenly pt-14 lg:flex-row lg:pt-0'>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
