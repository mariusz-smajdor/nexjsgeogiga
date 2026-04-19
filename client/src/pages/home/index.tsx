import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Globe } from '@/components/ui/globe';
import { countriesQuery } from '@/queries/countries';
import type { Country } from '@/types/country';

export default function Home() {
  const { data } = useQuery<Country[]>(countriesQuery);

  console.log(data);

  return (
    <>
      <section className='flex max-w-100 flex-col text-center'>
        <h1 className='text-2xl font-medium uppercase'>Explore the world!</h1>
        <p className='text-muted-foreground mt-4 text-lg'>
          Get dropped anywhere from the busy streets of Kalety to the beautiful
          beaches of Stegna.
        </p>
        <p className='text-muted-foreground mt-2 text-lg'>
          Join 0 million players today!
        </p>
        <Button size='lg' className='mt-4'>
          Play Now
        </Button>
      </section>
      <Globe />
    </>
  );
}
