import { useMutation } from '@tanstack/react-query';
import type { SignUpValues } from '@geogiga/schemas/auth';
import type { AuthResponse, TreeError, FieldError } from '@geogiga/types/auth';

import { registerUser } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import type { UseFormSetError } from 'react-hook-form';

type Props = {
	setError: UseFormSetError<SignUpValues>;
	onSuccessNavigate?: () => void;
};

export function useAuthMutation({ setError, onSuccessNavigate }: Props) {
	const { toast } = useToast();

	return useMutation({
		mutationFn: registerUser,

		onSuccess: (data: AuthResponse) => {
			toast({
				title: data.title,
				description: data.message,
			});

			onSuccessNavigate?.();
		},

		onError: (error: any) => {
			const cause = error?.cause as AuthResponse | undefined;

			const title = cause?.title ?? 'Something went wrong';
			const description = cause?.message ?? 'Please try again later.';
			const details = cause?.details as TreeError | undefined;

			if (details?.properties) {
				Object.entries(details.properties).forEach(([key, values]) => {
					const field = values as FieldError;

					field.errors?.forEach((msg) => {
						setError(key as any, {
							type: 'server',
							message: msg,
						});
					});
				});
			}

			toast({
				title,
				description,
				variant: 'destructive',
			});
		},
	});
}
