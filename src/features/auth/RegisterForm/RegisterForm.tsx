import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  LockOutlined,
  MailOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { authApi } from '../../../api/authApi.ts'
import { toApiError } from '../../../api/ApiError.ts'
import { ROUTES } from '../../../constants/index.ts'
import { registerSchema, type RegisterFormValues } from './registerSchema.ts'
import styles from './RegisterForm.module.css'

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdEmail, setCreatedEmail] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const submitHandler = handleSubmit(async (values) => {
    setSubmitError(null)
    try {
      const user = await authApi.register({
        full_name: values.fullName,
        email: values.email,
        password: values.password,
      })
      setCreatedEmail(user.email)
      reset()
    } catch (error) {
      setSubmitError(toApiError(error).message)
    }
  })

  return (
    <Box component="form" onSubmit={(event) => void submitHandler(event)} noValidate>
      <Typography variant="h4" className={styles.title}>
        Create your account
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        It only takes a minute to get started.
      </Typography>

      {createdEmail && (
        <Alert severity="success" className={styles.alert}>
          Account created for {createdEmail}. You can now sign in.
        </Alert>
      )}
      {submitError && (
        <Alert severity="error" className={styles.alert}>
          {submitError}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography
                component="label"
                htmlFor="fullName"
                variant="body2"
                className={styles.fieldLabel}
              >
                Full Name
              </Typography>
              <TextField
                {...field}
                id="fullName"
                placeholder="Jane Doe"
                fullWidth
                size="small"
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined fontSize="small" className={styles.inputIcon} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          )}
        />

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
                placeholder="Create a password"
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
                placeholder="Re-enter your password"
                fullWidth
                size="small"
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
                          aria-label={
                            showConfirmPassword ? 'Hide password' : 'Show password'
                          }
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

        <Controller
          name="agreeToTerms"
          control={control}
          render={({ field }) => (
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    onBlur={field.onBlur}
                    name={field.name}
                    slotProps={{ input: { ref: field.ref } }}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" className={styles.termsLabel}>
                    I agree to the{' '}
                    <MuiLink href="#" underline="hover">
                      Terms of Service
                    </MuiLink>{' '}
                    and{' '}
                    <MuiLink href="#" underline="hover">
                      Privacy Policy
                    </MuiLink>
                  </Typography>
                }
              />
              {errors.agreeToTerms && (
                <FormHelperText error className={styles.termsError}>
                  {errors.agreeToTerms.message}
                </FormHelperText>
              )}
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
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>

        <Typography variant="body2" className={styles.footerText}>
          Already have an account?{' '}
          <MuiLink component={RouterLink} to={ROUTES.login} underline="hover">
            Sign in
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  )
}
