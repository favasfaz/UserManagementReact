const userModel = require('../model/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')
const dotenv=require('dotenv')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY
const maxAge = 3*24*60*60;

 dotenv.config()

 //userRegisteration
const userRegister = async(req,res)=>{
    const data = req.body
    const user = await userModel.findOne({email:data.email})
     try {      
       if(!user){
        data.password = await bcrypt.hash(data.password, 10);
        const newUser =await new userModel({
            email : data.email,
            phone : data.phone,
            password : data.password,
            fName:data.fName,
        })
        await newUser.save(async(error,done)=>{
            if(error){
                console.log('something went Wrong',error);
                res.json({status:false,msg:'something went wrong'})
            }else if(done){
                let token = jwt.sign({ _id: done._id,email:done.email,fName:done.fName }, SECRET_KEY, { expiresIn: maxAge });
                res.json({status:true,msg:'registration successfull',token})
            }
        })
       }
       else{
        res.status(400).json({message:'Email already taken'})
       }
    } catch (error) {
        res.json({message:'Email already taken'}).status(400)
    }
}


//userLogin
// const userLogin =async(req,res)=>{
//     const data = req.body

//     try {
//         const user = await userModel.findOne({email:data.email})
//         if(user.status){
//         bcrypt.compare(data.password, user.password).then(async (result) => {
//             if(result && user){
//                 let token = jwt.sign({ _id: user._id,email:data.email }, SECRET_KEY, { expiresIn: maxAge });
//                     res.status(200).json({msg:'success',token})
//             }
//           else{
//             throw 'double check your email and password';
//           }
//         })
//     }else{
//         throw 'Blocked by admin';
//     }

//     } catch (error) {
       
//         res.status(401).json(error)
//         next(error)
//     }

// }
const userLogin = async(req,res)=>{
    const data = req.body
    try {
        const user = await userModel.findOne({email:data.email})
        if(user){
        if(user && user.status){
           
        bcrypt.compare(data.password, user.password).then(async (result) => {
            if(result){
                let token = jwt.sign({ _id: user._id,email:data.email }, SECRET_KEY, { expiresIn: maxAge });
                    res.status(200).json({msg:'success',token})
            }
          else{
            throw 'double check your email and password';
          }
        })
        .catch((error)=> res.status(401).json(error))
    }else{
        throw 'Blocked by admin';
    }
        }else{
            throw 'No user found'
        }
    } catch (error) {
       
        res.status(401).json(error)
    }
}


module.exports = {userRegister,userLogin}