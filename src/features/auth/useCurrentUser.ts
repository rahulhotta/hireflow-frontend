import { useEffect, useState } from 'react'
import { authApi } from '../../api/authApi.ts'
import { toApiError } from '../../api/ApiError.ts'
import type { CurrentUser } from '../../types/auth.ts'

interface UseCurrentUserResult {
  user: CurrentUser | null
  loading: boolean
  error: string | null
}

// Fetches the authenticated user from /v1/auth/me on mount.
export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    authApi
      .me()
      .then((data) => {
        if (active) {
          setUser(data)
          setError(null)
        }
      })
      .catch((err) => {
        if (active) {
          setError(toApiError(err).message)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return { user, loading, error }
}
