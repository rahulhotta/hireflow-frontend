import { Box, Typography } from '@mui/material'
import { WorkOutlineRounded } from '@mui/icons-material'
import { ResetPasswordForm } from '../../features/auth/ResetPasswordForm/ResetPasswordForm.tsx'
import { APP_NAME } from '../../constants/index.ts'
import styles from './ResetPasswordPage.module.css'

export function ResetPasswordPage() {
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
            A fresh start for your account.
          </Typography>
          <Typography className={styles.heroSubtitle}>
            Choose a strong new password to keep your {APP_NAME} profile secure.
          </Typography>
        </Box>
      </Box>

      <Box className={styles.formColumn}>
        <Box className={styles.formColumnInner}>
          <Box className={styles.formWrapper}>
            <ResetPasswordForm />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
