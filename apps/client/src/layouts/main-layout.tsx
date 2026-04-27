import { Outlet } from 'react-router-dom';

import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

function MainLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Toaster />
		</>
	);
}

export default MainLayout;
