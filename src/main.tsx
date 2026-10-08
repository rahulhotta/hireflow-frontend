import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { store } from './app/store.ts'
import { theme } from './theme/theme.ts'
import { router } from './routes/router.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>,
)
