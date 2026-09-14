const SESSION_MARKER = "vd_session";

let currentToken: string | null = null;

export function setSessionToken(token: string | null): void {
  currentToken = token;
}

export function getSessionToken(): string | null {
  return currentToken;
}

// Non-sensitive marker set at login and cleared at logout. It tells the app a
// session may exist, so we only call /auth/refresh when there is something to
// refresh — avoiding a pointless 401 on every anonymous page load.
export function hasSessionMarker(): boolean {
  return document.cookie.split("; ").some((part) => part.startsWith(`${SESSION_MARKER}=1`));
}

export function setSessionMarker(): void {
  document.cookie = `${SESSION_MARKER}=1; path=/; samesite=lax; max-age=604800`;
}

export function clearSessionMarker(): void {
  document.cookie = `${SESSION_MARKER}=1; path=/; samesite=lax; max-age=0`;
}