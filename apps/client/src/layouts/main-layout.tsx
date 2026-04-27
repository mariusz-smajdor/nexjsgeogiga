import { Outlet } from 'react-router-dom';

import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toast';

function MainLayout() {
	return (
		<>
			<div className='flex min-h-dvh flex-col'>
				<Header />
				<Outlet />
			</div>
			<Toaster />
		</>
	);
}

export default MainLayout;
