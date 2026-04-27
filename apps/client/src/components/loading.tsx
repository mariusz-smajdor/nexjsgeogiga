import { Globe } from '@/components/ui/globe';

export function Loading() {
	return (
		<main className='flex flex-1 items-center justify-center'>
			<Globe draggable={false} />
		</main>
	);
}
