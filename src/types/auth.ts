export interface RegisterRequest {
  full_name: string
  email: string
  password: string
}

export interface RegisterResponse {
  id: string
  full_name: string
  email: string
  is_active: boolean
  created_at: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  status: string
  message: string
}

export interface LogoutResponse {
  status: string
  message: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  status: string
  message: string
}

export interface ResetPasswordRequest {
  password: string
  token: string
}

export interface ResetPasswordResponse {
  status: string
  message: string
}

export interface CurrentUser {
  id: string
  full_name: string
  email: string
  is_active: boolean
  created_at: string
}
