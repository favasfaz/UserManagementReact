import React from 'react'
import {AppBar,Toolbar,Typography,Box, IconButton, Button } from '@mui/material'
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import { useNavigate } from 'react-router-dom'
import AccountConstant from '../../Constants/AccountConstant';
import jwt from 'jwt-decode' 


function Header() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  // const admin = localStorage.getItem('adminToken')
  // console.log(admin,'admin');
  // const user = jwt(token); 
  // const adminToken =jwt(admin)
  // console.log(adminToken,'adtoke ');

  

  return (

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static"  style={{backgroundColor:'darkblue'}} >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <DesktopMacIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
        
          sx={{
            flexGrow: 1,
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {/* {admin ? 'ADMIN PANEL' :'LOGO'} */}
          LOGO
        </Typography>
        {/* {token && <AccountConstant email={user.email}/>} */}
        {/* {adminToken && <AccountConstant email={adminToken.email}/>} */}
        {/* {token && <Button sx={{ml:'auto'}} onClick={Logout} color="inherit">Logout</Button>} */}
        {token && <Button sx={{ml:'auto'}}  color="inherit"><AccountConstant/></Button>}

      </Toolbar>
    </AppBar>
  </Box>

  )
}

export default Header