'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginSchema } from '@/lib/zod';
import { handleLogin, type LoginCredentials } from '@/lib/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await handleLogin(data, callbackUrl);

      if (!result.success) {
        setError(result.error || 'Authentication failed');

        // If there's a redirect URL in the result, redirect to it
        if (result.redirectUrl) {
          router.push(result.redirectUrl);
          return;
        }

        return;
      }

      // Redirect on success
      router.push(result.redirectUrl || callbackUrl);
      router.refresh();
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" {...register('email')} disabled={isLoading} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" {...register('password')} disabled={isLoading} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
