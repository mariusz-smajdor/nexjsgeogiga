import { Globe } from '@/components/ui/globe';

function NotFound() {
	return (
		<section className='container mt-14'>
			<h1 className='text-center text-4xl'>
				You’ve reached the edge of the world!
			</h1>
			<div
				className='text-muted-foreground mt-7 hidden w-full items-center justify-center text-9xl sm:text-[16rem] [@media(min-width:320px)]:flex'
				role='img'
				aria-label='404 page not found'
			>
				<span aria-hidden='true'>4</span>
				<Globe aria-hidden='true' />
				<span aria-hidden='true'>4</span>
			</div>
			<div className='mt-7 text-center text-4xl [@media(min-width:320px)]:hidden'>
				404 Page Not Found!
			</div>
		</section>
	);
}

export default NotFound;
