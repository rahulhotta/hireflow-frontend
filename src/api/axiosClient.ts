import axios from 'axios'
import { env } from '../config/env.ts'
import { ROUTES } from '../constants/index.ts'
import { clearSession, getToken } from '../utils/authSession.ts'
import { toApiError } from './ApiError.ts'

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const apiError = toApiError(error)
    // A 401 on a request that carried a token means the session expired or was
    // revoked: clear it and hard-redirect to login so all in-memory state resets.
    if (apiError.statusCode === 401 && getToken()) {
      clearSession()
      if (window.location.pathname !== ROUTES.login) {
        window.location.assign(ROUTES.login)
      }
    }
    return Promise.reject(apiError)
  },
)
