import {
	filterCountriesByContinent,
	getRandomCountry,
} from '@/utils/countries';
import type { Country } from '@/types/country';
import type { Marker } from '@/types/globe';

export function getMarkers(countries: Country[]): Marker[] {
	const continents = [
		'Africa',
		'North America',
		'South America',
		'Asia',
		'Europe',
		'Oceania',
	] as const;

	return continents.map((continent, index) => {
		const countriesInContinent = filterCountriesByContinent(
			continent,
			countries,
		);
		const randomCountry = getRandomCountry(countriesInContinent);

		return {
			id: index.toString(),
			location: randomCountry.latlng[0],
			image: randomCountry.flags.svg,
			caption: randomCountry.name.common,
			rotate: Math.random() * 10 - 5,
		};
	});
}
