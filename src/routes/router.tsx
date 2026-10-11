import { createBrowserRouter, redirect } from 'react-router-dom'
import { ROUTES } from '../constants/index.ts'
import { isAuthenticated } from '../utils/authSession.ts'
import { AppLayout } from '../layouts/AppLayout/AppLayout.tsx'
import { GuestLayout } from '../layouts/GuestLayout/GuestLayout.tsx'
import { RootLayout } from '../layouts/RootLayout/RootLayout.tsx'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage/ForgotPasswordPage.tsx'
import { HomePage } from '../pages/HomePage/HomePage.tsx'
import { LoginPage } from '../pages/LoginPage/LoginPage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage.tsx'
import { RegisterPage } from '../pages/RegisterPage/RegisterPage.tsx'
import { ResetPasswordPage } from '../pages/ResetPasswordPage/ResetPasswordPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: () => redirect(isAuthenticated() ? ROUTES.home : ROUTES.login),
      },
      {
        element: <GuestLayout />,
        children: [
          { path: 'register', element: <RegisterPage /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
          // Token arrives as ?token=... and is read via useSearchParams.
          { path: 'reset-password', element: <ResetPasswordPage /> },
        ],
      },
      {
        element: <AppLayout />,
        children: [{ path: 'home', element: <HomePage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
