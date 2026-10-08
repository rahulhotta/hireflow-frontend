import { Suspense } from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { LoadingScreen } from '../../components/common/LoadingScreen/LoadingScreen.tsx'

export function RootLayout() {
  return (
    <Box component="main" sx={{ minHeight: '100dvh' }}>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </Box>
  )
}
