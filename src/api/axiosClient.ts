import axios from 'axios'
import { env } from '../config/env.ts'
import { ROUTES } from '../constants/index.ts'
import { clearSession, isAuthenticated } from '../utils/authSession.ts'
import { toApiError } from './ApiError.ts'

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
  // Send/receive the HttpOnly auth cookie on cross-origin requests.
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const apiError = toApiError(error)
    // A 401 while we think we're logged in means the cookie expired or was
    // revoked: clear it and hard-redirect to login so all in-memory state resets.
    if (apiError.statusCode === 401 && isAuthenticated()) {
      clearSession()
      if (window.location.pathname !== ROUTES.login) {
        window.location.assign(ROUTES.login)
      }
    }
    return Promise.reject(apiError)
  },
)
