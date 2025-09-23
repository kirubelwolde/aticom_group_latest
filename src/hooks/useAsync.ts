import { useState, useCallback, useRef, useEffect } from 'react';

type AsyncFunction<T, P extends any[]> = (...args: P) => Promise<T>;

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export function useAsync<T, P extends any[] = any[]>(
  asyncFunction: AsyncFunction<T, P>,
  options: UseAsyncOptions<T> = {}
) {
  const { onSuccess, onError, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const isMounted = useRef(true);
  const isActive = useRef(true);

  const execute = useCallback(
    async (...args: P) => {
      if (!isActive.current) return null;
      
      setStatus('pending');
      setError(null);

      try {
        const result = await asyncFunction(...args);
        
        if (isMounted.current) {
          setData(result);
          setStatus('success');
          onSuccess?.(result);
        }
        
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        
        if (isMounted.current) {
          setError(error);
          setStatus('error');
          onError?.(error);
        }
        
        throw error;
      }
    },
    [asyncFunction, onError, onSuccess]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus('idle');
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Auto-execute if enabled is true
  useEffect(() => {
    if (enabled && status === 'idle') {
      execute(...([] as unknown as P));
    }
  }, [enabled, execute, status]);

  return {
    data,
    error,
    status,
    isLoading: status === 'pending',
    isIdle: status === 'idle',
    isSuccess: status === 'success',
    isError: status === 'error',
    execute,
    reset,
  };
}

// Example usage:
/*
const { data, error, isLoading, execute } = useAsync(
  async (params) => {
    const response = await fetchData(params);
    return response;
  },
  {
    onSuccess: (data) => console.log('Data loaded:', data),
    onError: (error) => console.error('Error:', error),
    enabled: true, // Set to false to prevent auto-execution
  }
);
*/
