import type { Continent, Country } from '@/types/country';

export function getRandomCountry(countries: Country[]) {
	const randomIndex = Math.floor(Math.random() * countries.length);
	return countries[randomIndex];
}

export function filterCountriesByContinent(
	continent: Continent,
	countries: Country[],
) {
	return countries.filter((country) => country.continent === continent);
}
