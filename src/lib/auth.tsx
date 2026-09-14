import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { setSessionToken, hasSessionMarker, setSessionMarker, clearSessionMarker } from './session-token';
import { API_BASE_URL } from './api-base';

interface Session {
  email: string;
}

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function refreshAccessToken(): Promise<{ accessToken: string; email: string } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { accessToken: data.accessToken, email: data.email };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const inflight = useRef<Promise<{ accessToken: string; email: string } | null> | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      // Skip the refresh call entirely when there is no session marker, so
      // anonymous visitors never trigger a 401 on /auth/refresh.
      if (!hasSessionMarker()) {
        setLoading(false);
        return;
      }
      const token = await refreshAccessToken();
      if (!active) return;
      if (token) {
        setSessionToken(token.accessToken);
        setSession({ email: token.email });
        setSessionMarker();
      } else {
        clearSessionMarker();
        setSessionToken(null);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid email or password');
    const data = await res.json();
    setSessionToken(data.accessToken);
    setSessionMarker();
    setSession({ email: data.email });
  };

  const logout = async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    }).catch(() => {});
    setSessionToken(null);
    clearSessionMarker();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}