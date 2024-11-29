// import { handleMutationError } from '@/utils/error';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      // onError: handleMutationError,
    },
    mutations: {
      // onError: handleMutationError,
    },
  },
});