import type { FastifyInstance } from 'fastify';
import { countriesRoutes } from './countries/countries.routes.js';
import { authRoutes } from './auth/auth.routes.js';

export async function router(fastify: FastifyInstance) {
	fastify.register(countriesRoutes, { prefix: '/countries' });
	fastify.register(authRoutes, { prefix: '/auth' });
}
