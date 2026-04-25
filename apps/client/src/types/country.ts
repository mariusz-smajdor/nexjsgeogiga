export type Continent =
	| 'Africa'
	| 'North America'
	| 'South America'
	| 'Asia'
	| 'Europe'
	| 'Oceania'
	| 'Antarctica';

export interface Country {
	unMember: boolean;
	capital: string[];
	continent: Continent;
	borders: string[];
	area: number;
	population: number;
	name: {
		common: string;
		official: string;
	};
	currencies: Record<string, { symbol: string; name: string }>;
	languages: string[];
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	coatOfArms: {
		png: string;
		svg: string;
	};
	latlng: [number, number][];
}
