
const jwt = require('jsonwebtoken')


let tokenCheck = async function(req,res,next){
    
    let token = req.headers['x-auth-token']
    let validToken = jwt.verify(token,'golden01')

    if(validToken){
        req. validToken = validToken 
        next()
      
    }else{
        res.status(401).send({status:false,msg:"Invalid token"})
    }
   
}

//4rth
// let tokenPuter= async function(req,res,next){
    
//     let token = req.headers['x-auth-token']
//     let validToken = jwt.verify(token,'golden01')

//     if(validToken){
//         req. validToken = validToken 
//         next()

//     }else{
//         res.status(401).send({status:false,msg:"Invalid token"})
//     }
   
// }







module.exports.tokenCheck=tokenCheck
// module.exports.tokenPuter=tokenPuter