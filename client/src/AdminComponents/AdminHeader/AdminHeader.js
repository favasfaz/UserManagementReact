import  React,{useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import SearchConstant from '../../Constants/SearchConstant';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function AdminHeader({adminToken}) {
  const [search,setSearch] = useState('')
  const [results,setResults] = useState([])
  const [searchResult,setSearchResult] = useState(false)
  const navigate = useNavigate()
  const auth=localStorage.getItem("adminToken")

  const Logout = () =>{
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  useEffect(()=>{
    if(!auth){
      navigate("/admin")
    }
  },[])
  const searching = (e) =>{
    axios({
      method :'get',
      url:`/admin/searching/${e.target.value}`,
    })
    .then((res)=>setResults(res.data))
  }
 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ADMIN PANEL
          </Typography>
         {auth && <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={searching}
              onClick={()=>{setSearchResult(true)}}
            />
          </Search>}
          {searchResult && <SearchConstant state= {searchResult} search={search} setState={setSearchResult} results={results}/>}
          {adminToken && <Button onClick={Logout} sx={{ml:'auto'}}  color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
