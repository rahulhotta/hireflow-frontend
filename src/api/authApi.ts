import type {
  CurrentUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth.ts'
import { http } from './http.ts'

const REGISTER_ENDPOINT = '/v1/auth/register'
const LOGIN_ENDPOINT = '/v1/auth/login'
const ME_ENDPOINT = '/v1/auth/me'

export const authApi = {
  register: (payload: RegisterRequest): Promise<RegisterResponse> =>
    http.post<RegisterResponse>(REGISTER_ENDPOINT, payload),

  // OAuth2 password flow: sent as application/x-www-form-urlencoded.
  login: (payload: LoginRequest): Promise<LoginResponse> => {
    const body = new URLSearchParams({
      grant_type: 'password',
      username: payload.username,
      password: payload.password,
    })
    return http.post<LoginResponse>(LOGIN_ENDPOINT, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },

  // Requires a valid bearer token (added by the axios request interceptor).
  me: (): Promise<CurrentUser> => http.get<CurrentUser>(ME_ENDPOINT),
}
