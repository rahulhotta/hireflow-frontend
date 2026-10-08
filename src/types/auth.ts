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
  access_token: string
  token_type: string
}

export interface CurrentUser {
  id: string
  full_name: string
  email: string
  is_active: boolean
  created_at: string
}
