import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const signInSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { toast } = useToast();

  function onSubmit(values: SignInValues) {
    toast({
      title: 'Sign In Form Submitted',
      description: (
        <pre className='bg-muted mt-2 w-85 rounded-md p-4'>
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
      />
      <FormField
        control={form.control}
        name='password'
        label='Password'
        type='password'
      />
      <Button type='submit'>Sign In</Button>
    </form>
  );
}
