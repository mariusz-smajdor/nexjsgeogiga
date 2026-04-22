import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className='bg-background/25 sticky z-1 w-full backdrop-blur-xs'>
      <div className='container flex h-14 items-center justify-between gap-4'>
        <Link to='/' className='flex items-center gap-1'>
          <MapPin size={28} />
          <span className='text-xl select-none'>GeoGiga</span>
        </Link>
      </div>
    </header>
  );
}
