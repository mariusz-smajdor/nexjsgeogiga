import { createContext, useContext, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchCountries } from '../services/api';
import { type Country } from '../types/country';

interface CountriesContextType {
  countries: Country[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const CountriesContext = createContext<CountriesContextType | undefined>(
  undefined,
);

export function CountriesProvider({ children }: { children: ReactNode }) {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: Infinity,
  });

  return (
    <CountriesContext.Provider
      value={{ countries, isLoading, error: error as Error }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
};
