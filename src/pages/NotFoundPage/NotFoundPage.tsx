import { Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/index.ts'

export function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="h3" component="h1">
          404 &mdash; Page not found
        </Typography>
        <Button component={Link} to={ROUTES.home} variant="contained">
          Back home
        </Button>
      </Stack>
    </Container>
  )
}
