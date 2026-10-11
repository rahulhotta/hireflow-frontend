// The JWT lives in an HttpOnly cookie; this flag is only a UI hint for route guards.
const SESSION_KEY = 'isAuthenticated'
const LEGACY_TOKEN_KEY = 'token'

export function isAuthenticated(): boolean {
  return localStorage.getItem(SESSION_KEY) === 'true'
}

export function saveSession(): void {
  localStorage.setItem(SESSION_KEY, 'true')
  localStorage.removeItem(LEGACY_TOKEN_KEY)
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(LEGACY_TOKEN_KEY)
}
