import React, { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {  Oval } from 'react-loader-spinner'
import { Grid,Typography} from '@mui/material'


function Home() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    //useEffect
    useEffect(() => {
      setTimeout(() => {
        const auth=localStorage.getItem("token")
        if(!auth){
         navigate("/")
        }
        setLoading(false);
      }, 1000);
    }, [])
 

  return (

<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>

  {loading ? <Grid item xs={3}>
  <Oval
  ariaLabel="loading-indicator"
  height={100}
  width={100}
  strokeWidth={5}
  strokeWidthSecondary={1}
  color="blue"
  secondaryColor="white"
/>
  </Grid> :
  <Grid item xs={3}>
    <Typography variant='h2' gutterBottom>
      WELCOME TO HOME
    </Typography>
  </Grid>
  }  
   
</Grid> 
  )
}

export default Home