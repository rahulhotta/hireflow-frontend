import { Button, Container, Stack, Typography } from '@mui/material'
import { APP_NAME } from '../../constants/index.ts'

export function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="h3" component="h1">
          Welcome to {APP_NAME}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your project structure is ready. Add features under src/features and
          pages under src/pages.
        </Typography>
        <Button variant="contained">Get started</Button>
      </Stack>
    </Container>
  )
}
