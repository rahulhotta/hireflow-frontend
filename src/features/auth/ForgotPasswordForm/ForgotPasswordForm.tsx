import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ArrowBack, MailOutlined } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { authApi } from '../../../api/authApi.ts'
import { toApiError } from '../../../api/ApiError.ts'
import { ROUTES } from '../../../constants/index.ts'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from './forgotPasswordSchema.ts'
import styles from './ForgotPasswordForm.module.css'

export function ForgotPasswordForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const submitHandler = handleSubmit(async (values) => {
    setSubmitError(null)
    setSuccessMessage(null)
    try {
      const response = await authApi.forgotPassword({ email: values.email })
      setSuccessMessage(response.message)
      reset()
    } catch (error) {
      setSubmitError(toApiError(error).message)
    }
  })

  return (
    <Box component="form" onSubmit={(event) => void submitHandler(event)} noValidate>
      <Typography variant="h4" className={styles.title}>
        Forgot password?
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Enter the email associated with your account and we&apos;ll send you a reset link.
      </Typography>

      {successMessage && (
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </Button>

        <Typography variant="body2" className={styles.footerText}>
          <MuiLink component={RouterLink} to={ROUTES.login} underline="hover">
            <ArrowBack fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
            Back to sign in
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  )
}
