import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Globe } from '@/components/ui/globe';
import { countriesQuery } from '@/queries/countries';
import { getMarkers } from './helpers';
import type { Country } from '@/types/country';
import type { Marker } from '@/types/globe';

export default function Home() {
  const { data: countries, isLoading } = useQuery<Country[]>(countriesQuery);

  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    if (!countries) return;

    setMarkers(getMarkers(countries));

    const interval = setInterval(() => {
      setMarkers(getMarkers(countries));
    }, 10_000);

    return () => clearInterval(interval);
  }, [countries]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className='relative container flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-evenly md:flex-row md:pt-0'>
      <section className='absolute z-1 flex max-w-100 flex-col text-center sm:px-0 md:left-4 lg:static'>
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

      {countries && (
        <Globe
          markers={markers}
          className='absolute z-0 md:right-4 lg:static'
        />
      )}
    </main>
  );
}
