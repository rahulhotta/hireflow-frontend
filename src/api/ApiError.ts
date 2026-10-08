import axios from 'axios'

export class ApiError extends Error {
  readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

// Normalizes any thrown value (Axios error, Error, or unknown) into an ApiError.
export function toApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error
  }
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    return new ApiError(data?.message ?? error.message, error.response?.status ?? 0)
  }
  if (error instanceof Error) {
    return new ApiError(error.message, 0)
  }
  return new ApiError('Unexpected error', 0)
}
