import { Box, Typography } from '@mui/material'
import { WorkOutlineRounded } from '@mui/icons-material'
import { LoginForm } from '../../features/auth/LoginForm/LoginForm.tsx'
import { APP_NAME } from '../../constants/index.ts'
import styles from './LoginPage.module.css'

export function LoginPage() {
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
            Find your next career milestone.
          </Typography>
          <Typography className={styles.heroSubtitle}>
            Join thousands of professionals finding their dream jobs with {APP_NAME}.
            Your next opportunity is just one login away.
          </Typography>

          <Box className={styles.socialProof}>
            <Typography variant="body2" className={styles.socialText}>
              +12k people joined this week
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={styles.formColumn}>
        <Box className={styles.formColumnInner}>
          <Box className={styles.formWrapper}>
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
