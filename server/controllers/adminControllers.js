const userModel = require ('../model/userSchema')

 const adminSchema = require('../model/adminSchema')
const jwt = require('jsonwebtoken')
 const SECRET_KEY = process.env.SECRET_KEY
const maxAge = 3*24*60*60;

const adminLogin= async (req,res)=>{
    const data = req.body

    try {
        const admin = await adminSchema.findOne({email:data.email})
            if(admin){
                let token = jwt.sign({ _id: admin._id,email:admin.email }, SECRET_KEY, { expiresIn: maxAge });
                    res.status(200).json({msg:'success',token})
            }
        else{
            throw 'double check your email and password';
        }
      

    } catch (error) {
        res.status(401).json(error)
    }
}

const allUsers =async(req,res)=>{
    const users =await userModel.find({})
    res.status(200).json(users)
}

const blockUser = async (req,res)=>{
    const id = req.params
 const updateUser =  await userModel.findByIdAndUpdate({_id:id.id},{$set : {status:false}})
 console.log(updateUser,'updateUser');
    res.json(updateUser)
}

const deleteUser = async (req,res) =>{
   const id = req.params
   console.log(id,'id success');
  await userModel.findByIdAndDelete({_id:id.id})
       res.json({status:true})
}

const unBlockUser =async (req,res) =>{
    const id = req.params
      await userModel.findByIdAndUpdate({_id:id.id},{$set : {status:true}})
       res.json({status:true})
}
const searchUser =async(req,res) =>{
    const id = req.params.id
    let details= await userModel.find(
        {
        "$or":[
            {email:{$regex:id}}
        ]
       }
    )
    res.status(200).json(details)
}


module.exports = {searchUser,adminLogin,allUsers,blockUser,unBlockUser,deleteUser}