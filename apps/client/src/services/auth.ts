import type { SignUpValues } from '@geogiga/schemas/auth';

export async function registerUser({
	email,
	password,
	confirmPassword,
	username,
}: SignUpValues) {
	const response = await fetch('http://localhost:3000/api/auth/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, confirmPassword, username }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error('Something went wrong', { cause: data });
	}

	return data;
}
