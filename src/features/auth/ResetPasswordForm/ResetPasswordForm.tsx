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
import { ArrowBack, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../../../api/authApi.ts'
import { toApiError } from '../../../api/ApiError.ts'
import { ROUTES } from '../../../constants/index.ts'
import { resetPasswordSchema, type ResetPasswordFormValues } from './resetPasswordSchema.ts'
import styles from './ResetPasswordForm.module.css'

export function ResetPasswordForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const submitHandler = handleSubmit(async (values) => {
    if (!token) return
    setSubmitError(null)
    try {
      const response = await authApi.resetPassword({ password: values.password, token })
      navigate(ROUTES.login, { replace: true, state: { successMessage: response.message } })
    } catch (error) {
      setSubmitError(toApiError(error).message)
    }
  })

  const backToLogin = (
    <Typography variant="body2" className={styles.footerText}>
      <MuiLink component={RouterLink} to={ROUTES.login} underline="hover">
        <ArrowBack fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
        Back to sign in
      </MuiLink>
    </Typography>
  )

  if (!token) {
    return (
      <Box>
        <Typography variant="h4" className={styles.title}>
          Reset password
        </Typography>
        <Alert severity="error" className={styles.alert} sx={{ mt: 3 }}>
          This reset link is invalid or missing a token.{' '}
          <MuiLink component={RouterLink} to={ROUTES.forgotPassword} underline="hover">
            Request a new link
          </MuiLink>
          .
        </Alert>
        {backToLogin}
      </Box>
    )
  }

  return (
    <Box component="form" onSubmit={(event) => void submitHandler(event)} noValidate>
      <Typography variant="h4" className={styles.title}>
        Set a new password
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Your new password must be at least 8 characters.
      </Typography>

      {submitError && (
        <Alert severity="error" className={styles.alert}>
          {submitError}
        </Alert>
      )}

      <Stack spacing={2.5}>
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
                New Password
              </Typography>
              <TextField
                {...field}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter a new password"
                fullWidth
                size="small"
                autoComplete="new-password"
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography
                component="label"
                htmlFor="confirmPassword"
                variant="body2"
                className={styles.fieldLabel}
              >
                Confirm Password
              </Typography>
              <TextField
                {...field}
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your new password"
                fullWidth
                size="small"
                autoComplete="new-password"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
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
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? (
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Resetting…' : 'Reset password'}
        </Button>

        {backToLogin}
      </Stack>
    </Box>
  )
}
