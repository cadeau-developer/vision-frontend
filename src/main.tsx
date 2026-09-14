import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { I18nProvider } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth';
import { setAuthTokenGetter, setBaseUrl } from '@/lib/api-client-react';
import { API_BASE_URL } from '@/lib/api-base';
import { getSessionToken } from '@/lib/session-token';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

setAuthTokenGetter(() => getSessionToken());
if (import.meta.env.VITE_API_BASE_URL) {
  setBaseUrl(API_BASE_URL);
}

function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')!, {
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <Providers />
  </ErrorBoundary>,
);