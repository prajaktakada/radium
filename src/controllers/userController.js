
const jwt = require('jsonwebtoken')

const  userModel= require('../models/userModel.js')

//resister
const registerUser= async function (req, res) {

   let data= req.body
    let savedData= await userModel.create(data)
    res.send({msg: savedData})
}

//login

let loginUser = async function(req,res){
    
    try{
        if(req.body && req.body.name && req.body.password){
            let user = await userModel.findOne({name:req.body.name,password:req.body.password,isDeleted:false})
            if(user){
                
                let payload = {_id:user._id}
                let token = jwt.sign(payload,'golden01')

                res.header('x-auth-token',token)
                res.status(200).send({status:true})
            }else{
                res.status(401).send({status:false,msg:"Invalid username or password"})
            }
       
        }else{
            res.status(400).send({status:false,msg:"request body must contain username as well as password"})
        }
   }catch(error){
       res.status(500).send({status:false,msg:"error message"})
   }

}



//get /users/:userId

let getUserDetails  = async function(req,res){
      
    if(req.validToken._id==req.params.userId){
 let user = await userModel.findOne({_id:req.params.userId,isDeleted:false})
    
      if(user){
        res.send({data:user})
    }else{
        res.send({msg:"user not found"})
    }
}else{
    res.send({msg:"not authorized"})
}

}

//PUT /users/:userId (Protected API - token validation

let putuserDetails = async function(req,res){

    if(req.validToken._id==req.params.userId){
 let puter = await userModel.findOneAndUpdate({_id:req.params.userId},{email:req.body.email},{new:true})
    
      if(puter){
        res.send({data:puter})
    }else{
        res.send({msg:"user not found"})
    }
}else{
    res.send({msg:"not authorized"})
}

}


module.exports.registerUser= registerUser
module.exports.loginUser= loginUser
module.exports.getUserDetails = getUserDetails 
module.exports. putuserDetails =  putuserDetails







