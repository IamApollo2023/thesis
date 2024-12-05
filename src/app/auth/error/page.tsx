'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    // If user cancelled the Google sign in, redirect to sign in page after a brief delay
    if (error === 'OAuthSignin' || error === 'OAuthCallback') {
      const timer = setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [error, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Authentication Error
          </h2>
          <p className="mt-2 text-gray-600">
            {error === 'OAuthSignin' || error === 'OAuthCallback'
              ? 'Sign in was cancelled. Redirecting back to sign in page...'
              : 'There was an error signing in. Please try again.'}
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
