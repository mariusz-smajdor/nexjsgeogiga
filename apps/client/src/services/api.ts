import type { Country } from '../types/country';

export async function fetchCountries(): Promise<Country[]> {
	const response = await fetch('http://localhost:3000/api/countries');

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || 'Failed to fetch countries');
	}

	return response.json();
}
