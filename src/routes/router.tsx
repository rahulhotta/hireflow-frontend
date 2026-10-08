import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout/AppLayout.tsx'
import { GuestLayout } from '../layouts/GuestLayout/GuestLayout.tsx'
import { RootLayout } from '../layouts/RootLayout/RootLayout.tsx'
import { HomePage } from '../pages/HomePage/HomePage.tsx'
import { LoginPage } from '../pages/LoginPage/LoginPage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage.tsx'
import { RegisterPage } from '../pages/RegisterPage/RegisterPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          { path: 'register', element: <RegisterPage /> },
          { path: 'login', element: <LoginPage /> },
        ],
      },
      {
        element: <AppLayout />,
        children: [{ path:'home',index: true, element: <HomePage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
