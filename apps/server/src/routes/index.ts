import type { FastifyInstance } from 'fastify';
import { countriesRoutes } from '@/routes/countries.routes.js';
import { authRoutes } from '@/routes/auth.routes.js';

export async function router(fastify: FastifyInstance) {
	fastify.register(countriesRoutes, { prefix: '/countries' });
	fastify.register(authRoutes, { prefix: '/auth' });
}
