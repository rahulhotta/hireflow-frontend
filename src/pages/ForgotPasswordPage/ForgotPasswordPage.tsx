import { Box, Typography } from '@mui/material'
import { WorkOutlineRounded } from '@mui/icons-material'
import { ForgotPasswordForm } from '../../features/auth/ForgotPasswordForm/ForgotPasswordForm.tsx'
import { APP_NAME } from '../../constants/index.ts'
import styles from './ForgotPasswordPage.module.css'

export function ForgotPasswordPage() {
  return (
    <Box className={styles.page}>
      <Box className={styles.hero}>
        <Box className={styles.brand}>
          <Box className={styles.brandIcon}>
            <WorkOutlineRounded className={styles.brandIconSvg} />
          </Box>
          <Typography variant="h6" className={styles.brandTitle}>
            {APP_NAME}
          </Typography>
        </Box>

        <Box className={styles.heroContent}>
          <Typography variant="h3" className={styles.heroTitle}>
            Locked out? It happens.
          </Typography>
          <Typography className={styles.heroSubtitle}>
            We&apos;ll email you a secure link to reset your password and get you back to
            your job search.
          </Typography>
        </Box>
      </Box>

      <Box className={styles.formColumn}>
        <Box className={styles.formColumnInner}>
          <Box className={styles.formWrapper}>
            <ForgotPasswordForm />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
