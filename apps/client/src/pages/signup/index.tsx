import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpValues } from '@geogiga/schemas/auth';

import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function SignUpForm() {
	const form = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const { toast } = useToast();

	function onSubmit(values: SignUpValues) {
		toast({
			title: 'Sign Up Form Submitted',
			description: (
				<pre className='bg-muted mt-2 mb-1 w-85 rounded-md p-4'>
					<code className='text-foreground'>
						{JSON.stringify(values, null, 2)}
					</code>
				</pre>
			),
		});
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
