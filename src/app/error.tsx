'use client';

import { useEffect } from 'react';
import { Button } from '@/components/atoms/button';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm text-center space-y-6">
        <div className="inline-flex p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-full">
          <AlertCircle className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Failed to Load Internships
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {error.message || 'An unexpected error occurred while communicating with the Internshala servers.'}
          </p>
        </div>

        <Button
          onClick={reset}
          className="w-full h-11 bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
