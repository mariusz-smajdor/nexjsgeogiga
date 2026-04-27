import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { router } from '@/routes/index.js';

export const buildApp = (options = {}) => {
	const app = Fastify(options);

	app.addHook('onRequest', (_, reply, done) => {
		reply.header('Access-Control-Allow-Origin', '*');
		reply.header(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE, OPTIONS',
		);
		reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		done();
	});

	app.get('/', async () => {
		return { hello: 'GeoGiga API' };
	});

	app.register(fastifyCors, {
		origin: true, // Development only, adjust for production
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	});
	app.register(router, { prefix: '/api' });

	return app;
};
