const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
 
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
fname:{
  type:String,
}
});


const admin = mongoose.model("admin", adminSchema);

module.exports = admin;