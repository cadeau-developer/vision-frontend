import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Home } from '@/pages/Home';
import { RequestPage } from '@/pages/RequestPage';
import { Admin } from '@/pages/admin/Admin';
import { AuthPage } from '@/pages/auth';
import NotFound from '@/pages/not-found';
import { useAuth } from '@/lib/auth';

export function GuardedAdmin() {
  const { session, loading } = useAuth();
  if (loading) {
    return <div className="grid min-h-[100dvh] place-items-center bg-canvas"><div className="h-8 w-8 animate-pulse rounded-full bg-brand" /></div>;
  }
  // Logged-out visitors see the sign-in form right here at /admin.
  return session ? <Admin /> : <AuthPage />;
}

function AppRouter() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/request" component={RequestPage} />
        <Route path="/admin" component={GuardedAdmin} />
        <Route path="/sign-in" component={() => <AuthPage />} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <WouterRouter base={basePath}>
      <AppRouter />
    </WouterRouter>
  );
}

export default App;