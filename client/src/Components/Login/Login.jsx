import { Button, Paper,TextField,Typography,Grid, Avatar, FormControl,  FormGroup, FormControlLabel, Checkbox, } from '@mui/material'
import React, { useState,useEffect } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
   const navigate = useNavigate()
   console.log(error,'error');

   useEffect(() => {
      const auth=localStorage.getItem("token")
      if(auth){
       navigate("/home")
      }
  }, [])

   const handleSubmit =(e)=>{
    e.preventDefault()
    axios({
      url : '/loginUser',
      method : 'post',
      data:{
        email:email,
        password:password
      }
    })
    .then((response)=>{       
      localStorage.setItem('token',response.data.token)
    navigate('/home')
  })
    .catch((err)=>  setError(err.response.data))
   }

  
  return (
   <Grid container mt={5}>
      <Paper elevation={10} style={{padding:40,height:'60vh',width:380 , margin:'20px auto'}}>
      <Grid align='center'alignItems='center'  justifyContent='center'>
      <Avatar style={{backgroundColor:'darkblue'}}><LockIcon/></Avatar>
      <Typography mt={2} variant='h5'>SIGN IN</Typography>
      </Grid>
 
     <Grid mt={5}>
      {error ? <Typography color='error.main' variant='subtitle1' component='div'>{error}</Typography> : ''}
      <TextField style={{marginTop:'10px'}} value={email} onChange={e=>setEmail(e.target.value)}   label='Email' type='email'  fullWidth/>
      <TextField  style={{marginTop:'20px'}} value={password} label='Password' onChange={e=>setPassword(e.target.value)} type='password'  fullWidth/>
     
          </Grid>
     <Grid mt={3}>
     <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Remember Me"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
     </Grid>
     <Button type='submit' onClick={handleSubmit} variant="contained" style={{color:'white',backgroundColor:'darkblue',marginTop:'5px'}} fullWidth>Submit</Button>
     <Typography mt={1} variant='body1'>Forgot Password?</Typography>
     <Typography style={{cursor:'pointer'}}  variant='body1' onClick={()=>{navigate('/signup')}}>I dont have Account? Signup</Typography>

      </Paper>
   </Grid>
  )
}

export default Login