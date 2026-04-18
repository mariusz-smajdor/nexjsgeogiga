import { useEffect } from 'react';

import { useCountries } from './context/CountriesContext';

function App() {
  const { countries, error } = useCountries();

  useEffect(() => {
    if (countries) {
      console.log('Countries fetched successfully:', countries);
    }
    if (error) {
      console.error('Error fetching countries:', error);
    }
  }, [countries, error]);

  return <main>Hello GeoGiga</main>;
}

export default App;
