import Fastify from 'fastify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
	logger: true,
});

fastify.addHook('onRequest', (_, reply, done) => {
	reply.header('Access-Control-Allow-Origin', '*');
	reply.header('Access-Control-Allow-Methods', 'GET');
	reply.header('Access-Control-Allow-Headers', 'Content-Type');
	done();
});

fastify.get('/api/countries', async () => {
	const data = fs.readFileSync(
		path.join(__dirname, '..', 'countries.json'),
		'utf8',
	);
	return JSON.parse(data);
});

fastify.get('/', async () => {
	return { hello: 'GeoGiga' };
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
