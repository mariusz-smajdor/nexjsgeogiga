import { z } from 'zod';

export const signInSchema = z.object({
	email: z.email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema
	.extend({
		confirmPassword: z.string(),
		username: z
			.string()
			.min(3, { message: 'Username must be at least 3 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
export type SignUpValues = z.infer<typeof signUpSchema>;
