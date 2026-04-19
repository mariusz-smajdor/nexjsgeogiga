import { fetchCountries } from '../services/api';

export const countriesQuery = {
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: Infinity,
};
