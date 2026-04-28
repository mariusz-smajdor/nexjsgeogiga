import type { FastifyInstance } from 'fastify';
import { signUp } from '@/controllers/auth.controller.js';

export async function authRoutes(fastify: FastifyInstance) {
	fastify.post('/signup', signUp);
}
