import Fastify from 'fastify';

const fastify = Fastify({
	logger: true,
});

fastify.get('/', async () => {
	return 'Hello GeoGiga';
});

async function init() {
	try {
		await fastify.listen({ port: 3000, host: '0.0.0.0' });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

init();
