import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  ArrowForward,
  LockOutlined,
  MailOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '../../../api/authApi.ts'
import { toApiError } from '../../../api/ApiError.ts'
import { ROUTES } from '../../../constants/index.ts'
import { saveSession } from '../../../utils/authSession.ts'
import { loginSchema, type LoginFormValues } from './loginSchema.ts'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { successMessage?: unknown } | null
  const successMessage =
    typeof locationState?.successMessage === 'string' ? locationState.successMessage : null
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitHandler = handleSubmit(async (values) => {
    setSubmitError(null)
    try {
      await authApi.login({
        username: values.email,
        password: values.password,
      })
      saveSession()
      navigate(ROUTES.home)
    } catch (error) {
      setSubmitError(toApiError(error).message)
    }
  })

  return (
    <Box component="form" onSubmit={(event) => void submitHandler(event)} noValidate>
      <Typography variant="h4" className={styles.title}>
        Welcome back
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Please enter your details to sign in.
      </Typography>

      {successMessage && !submitError && (
        <Alert severity="success" className={styles.alert}>
          {successMessage}
        </Alert>
      )}
      {submitError && (
        <Alert severity="error" className={styles.alert}>
          {submitError}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography
                component="label"
                htmlFor="email"
                variant="body2"
                className={styles.fieldLabel}
              >
                Email Address
              </Typography>
              <TextField
                {...field}
                id="email"
                type="email"
                placeholder="name@company.com"
                fullWidth
                size="small"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlined fontSize="small" className={styles.inputIcon} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography
                component="label"
                htmlFor="password"
                variant="body2"
                className={styles.fieldLabel}
              >
                Password
              </Typography>
              <TextField
                {...field}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                fullWidth
                size="small"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined fontSize="small" className={styles.inputIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          )}
        />

        <Box className={styles.forgotRow}>
          <MuiLink
            component={RouterLink}
            to={ROUTES.forgotPassword}
            underline="hover"
            variant="body2"
          >
            Forgot password?
          </MuiLink>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          endIcon={<ArrowForward />}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>

        <Typography variant="body2" className={styles.footerText}>
          Don&apos;t have an account?{' '}
          <MuiLink component={RouterLink} to={ROUTES.register} underline="hover">
            Sign up
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  )
}
