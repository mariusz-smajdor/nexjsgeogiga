import type { FastifyInstance } from 'fastify';
import { signUp } from './auth.controller.js';

export async function authRoutes(fastify: FastifyInstance) {
	fastify.post('/signup', signUp);
}
