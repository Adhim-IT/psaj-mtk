import { signIn } from 'next-auth/react';
import { LoginSchema } from './zod';
import { z } from 'zod';

/**
 * Type for login credentials
 */
export type LoginCredentials = z.infer<typeof LoginSchema>;

/**
 * Type for login response
 */
export type LoginResponse = {
  success: boolean;
  error?: string;
  redirectUrl?: string;
};

/**
 * Validates login credentials against the LoginSchema
 * @param credentials - The credentials to validate
 * @returns An object with validation result and any errors
 */
export function validateCredentials(credentials: Partial<LoginCredentials>): {
  valid: boolean;
  errors?: Record<string, string>;
} {
  try {
    LoginSchema.parse(credentials);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      return { valid: false, errors };
    }
    return { valid: false, errors: { _form: 'Invalid credentials' } };
  }
}

/**
 * Handles user login using NextAuth
 * @param credentials - The login credentials (email and password)
 * @param callbackUrl - Optional URL to redirect to after successful login
 * @returns A promise that resolves to a LoginResponse
 */
export async function handleLogin(credentials: LoginCredentials, callbackUrl?: string): Promise<LoginResponse> {
  try {
    // Validate credentials
    const validation = validateCredentials(credentials);
    if (!validation.valid) {
      return {
        success: false,
        error: 'Invalid credentials format',
      };
    }

    // Attempt to sign in
    const result = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    // Handle sign in result
    if (!result?.ok) {
      if (result?.error === 'redirect:/register') {
        return {
          success: false,
          error: 'User not found',
          redirectUrl: '/register',
        };
      }

      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    return {
      success: true,
      redirectUrl: callbackUrl || '/',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Checks if a user is an admin based on their email
 * @param email - The user's email address
 * @returns Boolean indicating if the user is an admin
 */
export function isAdmin(email?: string | null): boolean {
  return email === 'admin@gmail.com';
}

/**
 * Gets the appropriate redirect URL based on user role
 * @param email - The user's email address
 * @param defaultUrl - Default URL to redirect to
 * @returns The appropriate redirect URL
 */
export function getRedirectUrl(email?: string | null, defaultUrl = '/'): string {
  if (isAdmin(email)) {
    return '/admin/dashboard';
  }
  return defaultUrl;
}
