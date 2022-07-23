const express = require("express");
var bodyParser = require('body-parser')
const config = require('./connection/config')
const {userRegister,userLogin} = require('./controllers/userControllers')
const {adminLogin,blockUser,unBlockUser,deleteUser,allUsers,searchUser,} = require('./controllers/adminControllers')
const router=express.Router();
const PORT = process.env.PORT || 6000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post("/api",userRegister);
app.post('/loginUser',userLogin)
app.post('/loginAdmin',adminLogin)
app.get('/admin/allUsers',allUsers)
app.get('/admin/blockUser/:id',blockUser)
app.get('/admin/deleteUser/:id',deleteUser)
app.get('/admin/unBlockUser/:id',unBlockUser)
app.get('/admin/searching/:id',searchUser)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
