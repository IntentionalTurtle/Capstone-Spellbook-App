import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography  from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAuth0 } from '@auth0/auth0-react';
import avatar from '../assets/images/d20 Avatar.jpg'



const pages = ['Spells', 'Features'];
const settings = ['My Book'];


function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOutOnClick = () => { 
      logout();
    };

    const signInOnClick = () => {
        loginWithRedirect();
    };

  return (
    <AppBar position="static" color='secondary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 10,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Helvetica Neue"',
              fontWeight: 200,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Character Book
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseUserMenu}>  
                <Link to={page.replace(/\s+/, "") } component={RouterLink} aria-current="page" >
                  {page}
                </Link>
              </MenuItem>
              ))}
            </Menu>
          </Box>
        {/* Small Version of Main Logo */}
          <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Helvetica Neue"',
              fontWeight: 200,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Character Book
          </Typography>

          {/* TODO Edit functionality of Page Nav buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2.5, color: 'black', display: 'block', fontWeight: 200, fontSize: 'h6.fontSize', fontFamily: '"Helvetica Neue"', fontStyle: 'normal' }}
              >
                <Link to={page.replace(/\s+/, "") } component={RouterLink} aria-current="page" color="white" underline='hover' textTransform='none'>
                    {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box>
              <Tooltip title="Character List">
                <IconButton onClick={handleOpenUserMenu} sx={{ mx: 10, color: 'white', fontSize: 'h6.fontSize' }}>
                  Characters 
                </IconButton>
              </Tooltip>
          </Box> 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open User Info">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
            {/* TODO Edit Functionality of the profile nav buttons */}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>  
                  <Link to={setting.replace(/\s+/, "") } component={RouterLink} aria-current="page">
                    {setting}
                  </Link>
                </MenuItem>
              ))}
              
              { !isAuthenticated ?
                <MenuItem onClick={signInOnClick}>
                Login
                </MenuItem>
                :
                <MenuItem onClick={signOutOnClick}>
                Logout
                </MenuItem>
            }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
