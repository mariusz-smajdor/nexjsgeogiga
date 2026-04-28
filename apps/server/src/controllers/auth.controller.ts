import { z } from 'zod';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { signUpSchema } from '@geogiga/schemas/auth';

import { registerUser } from '@/services/auth.service.js';

export const signUp = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const result = signUpSchema.safeParse(request.body);

		if (!result.success) {
			return reply.status(400).send({
				title: 'Validation Error',
				message: 'Please ensure all fields are correctly filled out.',
				details: z.treeifyError(result.error),
			});
		}

		await registerUser(result.data);

		return reply.status(201).send({
			title: 'Account Created',
			message: 'You can now sign in.',
		});
	} catch (err) {
		if (err instanceof Error && err.message === 'USER_ALREADY_EXISTS') {
			return reply.status(409).send({
				message: 'Email or username already taken.',
			});
		}

		return reply.status(500).send({
			title: 'Internal Server Error',
			message: 'Something went wrong, please try again later.',
		});
	}
};
