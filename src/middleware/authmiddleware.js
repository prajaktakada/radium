
const jwt = require('jsonwebtoken')


let tokenCheck = async function(req,res,next){
    
    let token = req.headers['x-auth-token']
    console.log(token)
    if(!token){
               
        return res.send({status:false,msg:"no authentication token present"})
    }else if(token)

    {
     
    let validToken = jwt.verify(token,'golden01')
    
    console.log(validToken)
    console.log(validToken.userId)
    console.log(req.params.userId)
    if(validToken._id ==req.params.userId){
        
        req.validToken = validToken 
         
     next()
      
    }else{
        res.send({status:false,msg:"user is not loggedin"})
    }
   
}else{
    res.send({status:false,msg:"token not valid"})
}


}


module.exports.tokenCheck=tokenCheck
// module.exports.tokenPuter=tokenPuter