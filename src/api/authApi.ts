import type {
  CurrentUser,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../types/auth.ts'
import { http } from './http.ts'

const REGISTER_ENDPOINT = '/v1/auth/register'
const LOGIN_ENDPOINT = '/v1/auth/login'
const ME_ENDPOINT = '/v1/auth/me'
const LOGOUT_ENDPOINT = '/v1/auth/logout'
const FORGOT_PASSWORD_ENDPOINT = '/v1/auth/forgot-password'
const RESET_PASSWORD_ENDPOINT = '/v1/auth/reset-password'

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

  // Authenticated via the HttpOnly cookie set by /login.
  me: (): Promise<CurrentUser> => http.get<CurrentUser>(ME_ENDPOINT),

  logout: (): Promise<LogoutResponse> => http.post<LogoutResponse>(LOGOUT_ENDPOINT),

  forgotPassword: (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> =>
    http.post<ForgotPasswordResponse>(FORGOT_PASSWORD_ENDPOINT, payload),

  resetPassword: (payload: ResetPasswordRequest): Promise<ResetPasswordResponse> =>
    http.post<ResetPasswordResponse>(RESET_PASSWORD_ENDPOINT, payload),
}
