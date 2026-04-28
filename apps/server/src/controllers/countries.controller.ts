import type { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getCountries = async (_: FastifyRequest, reply: FastifyReply) => {
	try {
		const data = await fs.readFile(
			path.join(__dirname, '..', '..', 'countries.json'),
			'utf8',
		);
		return reply.send(JSON.parse(data));
	} catch (error) {
		return reply.status(500).send({ error: 'Failed to load countries' });
	}
};
