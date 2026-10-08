import { useState, type MouseEvent } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { KeyboardArrowDown, Logout, Person } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { APP_NAME, ROUTES } from '../../../constants/index.ts'
import { clearSession } from '../../../utils/authSession.ts'
import { useCurrentUser } from '../../../features/auth/useCurrentUser.ts'

export function TopBar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)
  const { user } = useCurrentUser()

  const openMenu = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const handleLogout = () => {
    closeMenu()
    clearSession()
    navigate(ROUTES.login, { replace: true })
  }

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {APP_NAME}
        </Typography>

        <Box>
          <Button
            onClick={openMenu}
            color="inherit"
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            startIcon={
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                <Person fontSize="small" />
              </Avatar>
            }
            endIcon={<KeyboardArrowDown />}
            sx={{ textTransform: 'none', color: 'text.primary' }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user?.full_name ?? 'Account'}
            </Typography>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={closeMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { minWidth: 220, mt: 1 } } }}
          >
            {user && (
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                  {user.full_name}
                </Typography>
                {user.email && (
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {user.email}
                  </Typography>
                )}
              </Box>
            )}
            {user && <Divider />}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
