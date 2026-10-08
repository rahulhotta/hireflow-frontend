import { Avatar, AvatarGroup, Box, Typography } from '@mui/material'
import { WorkOutlineRounded } from '@mui/icons-material'
import { RegisterForm } from '../../features/auth/RegisterForm/RegisterForm.tsx'
import { APP_NAME } from '../../constants/index.ts'
import styles from './RegisterPage.module.css'

export function RegisterPage() {
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
            Your next role starts with an account.
          </Typography>
          <Typography className={styles.heroSubtitle}>
            Create a free {APP_NAME} profile and get matched with roles that fit your
            skills, not just your keywords.
          </Typography>

          <Box className={styles.socialProof}>
            <AvatarGroup max={3} className={styles.avatars}>
              <Avatar className={styles.avatarA}>A</Avatar>
              <Avatar className={styles.avatarB}>B</Avatar>
              <Avatar className={styles.avatarC}>C</Avatar>
            </AvatarGroup>
            <Typography variant="body2" className={styles.socialText}>
              110k+ people joined this week
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={styles.formColumn}>
        <Box className={styles.formColumnInner}>
          <Box className={styles.formWrapper}>
            <RegisterForm />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
