import { Link } from 'react-router-dom';

import { Globe } from '@/components/ui/globe';
import { Button } from '@/components/ui/button';

function NotFound() {
	return (
		<main className='container flex flex-1 flex-col items-center justify-center gap-6 text-center'>
			<div
				className='hidden w-full items-center justify-center text-9xl sm:text-[16rem] [@media(min-width:320px)]:flex'
				role='img'
				aria-label='404 page not found'
			>
				<span aria-hidden='true'>4</span>
				<Globe aria-hidden='true' />
				<span aria-hidden='true'>4</span>
			</div>
			<div className='text-4xl font-bold [@media(min-width:320px)]:hidden'>
				404 Page Not Found!
			</div>
			<h1 className='text-2xl'>
				<span className='text-4xl leading-normal font-bold'>Oops!</span> <br />
				<span className='text-muted-foreground'>
					You’ve reached the edge of the world!
				</span>
			</h1>
			<Button variant='link' className='text-lg' asChild>
				<Link to='/'>Go back to the homepage</Link>
			</Button>
		</main>
	);
}

export default NotFound;
