import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { TopBar } from '../../components/common/TopBar/TopBar.tsx'
import { LoadingScreen } from '../../components/common/LoadingScreen/LoadingScreen.tsx'
import { ROUTES } from '../../constants/index.ts'
import { getToken } from '../../utils/authSession.ts'

export function AppLayout() {
  if (!getToken()) {
    return <Navigate to={ROUTES.login} replace />
  }

  return (
    <>
      <TopBar />
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </>
  )
}
