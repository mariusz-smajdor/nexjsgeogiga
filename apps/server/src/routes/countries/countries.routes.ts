import type { FastifyInstance } from 'fastify';
import { getCountries } from './countries.controller.js';

export async function countriesRoutes(fastify: FastifyInstance) {
	fastify.get('/', getCountries);
}
