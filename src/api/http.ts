import type { AxiosRequestConfig } from 'axios'
import { axiosClient } from './axiosClient.ts'

// Thin typed wrapper around the axios instance. Each method resolves to the
// response body (`data`) so callers work with domain types directly.
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosClient.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosClient.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosClient.put<T>(url, data, config).then((response) => response.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosClient.patch<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosClient.delete<T>(url, config).then((response) => response.data),
}
