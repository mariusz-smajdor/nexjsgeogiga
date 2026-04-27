interface Details {
	errors?: string[];
	properties?: Record<
		string,
		{
			errors: string[];
		}
	>;
}

export interface AuthResponse {
	title: string;
	message: string;
	details?: Details;
}

export interface TreeError {
	properties?: Record<string, FieldError>;
	errors?: string[];
}

export interface FieldError {
	errors: string[];
}
