import { Link } from 'react-router-dom';
import { MapPinned } from 'lucide-react';

export function Header() {
	return (
		<header className='bg-background/25 border-border sticky top-0 z-10 w-full border-b backdrop-blur-xs'>
			<div className='container flex h-(--header-height) items-center justify-between gap-4'>
				<Link to='/' className='flex items-center gap-2'>
					<MapPinned size={28} strokeWidth={1.5} />
					<span className='text-2xl font-light select-none'>GeoGiga</span>
				</Link>
			</div>
		</header>
	);
}
