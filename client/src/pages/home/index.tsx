import { useQuery } from '@tanstack/react-query';

import { countriesQuery } from '../../queries/countries';
import type { Country } from '../../types/country';

export default function Home() {
  const { data } = useQuery<Country[]>(countriesQuery);

  console.log(data);

  return <h1>Hello GeoGiga</h1>;
}
