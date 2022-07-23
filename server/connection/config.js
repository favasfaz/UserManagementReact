const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/usersCollection',
  {
    useNewUrlParser: true,
  }
).then(()=>{
    console.log('mongoose is connected successfully');
})
.catch((err)=>console.log(err))