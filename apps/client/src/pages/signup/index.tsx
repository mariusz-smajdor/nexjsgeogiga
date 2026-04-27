import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpValues } from '@geogiga/schemas/auth';

import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { useAuthMutation } from '@/hooks/use-auth-mutation';

function SignUpForm() {
	const form = useForm<SignUpValues>({
		// resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
	});

	const navigate = useNavigate();

	const { mutate } = useAuthMutation({
		setError: form.setError,
		onSuccessNavigate: () => navigate('/signin'),
	});

	function onSubmit(values: SignUpValues) {
		mutate(values);
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='flex flex-col gap-4'
		>
			<FormField
				control={form.control}
				name='email'
				label='Email'
				type='email'
				placeholder='example@email.com'
			/>
			<FormField
				control={form.control}
				name='username'
				label='Username'
				type='username'
				placeholder='Your Username'
			/>
			<FormField
				control={form.control}
				name='password'
				label='Password'
				type='password'
				placeholder='********'
			/>
			<FormField
				control={form.control}
				name='confirmPassword'
				label='Confirm Password'
				type='password'
				placeholder='********'
			/>
			<Button type='submit'>Sign Up</Button>
		</form>
	);
}

export default SignUpForm;
