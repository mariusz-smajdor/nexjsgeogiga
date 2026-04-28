import bcrypt from 'bcrypt';
import { prisma } from '@/db/prisma.js';

export async function registerUser(data: {
	email: string;
	username: string;
	password: string;
}) {
	const { email, username, password } = data;

	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ email }, { username }],
		},
	});

	if (existingUser) {
		throw new Error('USER_EXISTS');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			username,
			password: hashedPassword,
		},
		select: { id: true },
	});

	return user;
}
