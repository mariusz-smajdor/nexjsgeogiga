import { Globe } from '@/components/ui/globe';

export function Loading() {
	return (
		<section className='flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center'>
			<Globe draggable={false} />
		</section>
	);
}
