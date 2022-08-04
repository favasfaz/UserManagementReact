import './App.css';
import {Routes,Route} from 'react-router-dom'
import UserLogin from './Pages/User/UserLogin';
import UserRegister from './Pages/User/UserRegister';
import UserHome from './Pages/User/UserHome';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminHome from './Pages/Admin/AdminHome';


function App() {

  const adminToken = localStorage.getItem('adminToken')

  return (
    <div className="App">
   <Routes>
    <Route path='/' element={<UserLogin/>}/>
    <Route path='/signup' element={<UserRegister/>}/>
    <Route path='/home' element={  <UserHome/>}/>
    <Route exact path='/admin' element={<AdminLogin/>}/>
    <Route exact path='/admin/feed' element={<AdminHome/>}/>
   </Routes>
 
    </div>
  );
}

export default App;
