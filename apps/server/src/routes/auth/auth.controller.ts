import { z } from 'zod';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { signUpSchema } from '@geogiga/schemas/auth';

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

		return reply.status(201).send({
			title: 'Account Successfully Created',
			message: 'You can now sign in with your new account.',
		});
	} catch (err) {
		return reply.status(500).send({
			title: 'Internal Server Error',
			message:
				err instanceof Error
					? err.message
					: 'Something went wrong, please try again later.',
		});
	}
};
