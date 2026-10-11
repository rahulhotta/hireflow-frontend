import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constants/index.ts'
import { isAuthenticated } from '../../utils/authSession.ts'

// Guest-only guard: authenticated users are bounced to home so they can't
// reach /login or /register via the back button or by typing the URL.
export function GuestLayout() {
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.home} replace />
  }

  return <Outlet />
}
