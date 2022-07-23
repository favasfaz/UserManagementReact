const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
 
  email:{
      type: String,
      required:true,
      unique:true
  },
  password:{
type:String,
required:true,
},

create :{
  type:Date,
  default:Date.now
},
status:{
  type: Boolean,
  default:true
},
phone:{
  type:String,
  required:true,
},
fName:{
  type:String,
}

});


const User = mongoose.model("User", UserSchema);

module.exports = User;