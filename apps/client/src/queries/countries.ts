import { fetchCountries } from '@/services/country';

export const countriesQuery = {
	queryKey: ['countries'],
	queryFn: fetchCountries,
	staleTime: Infinity,
};
