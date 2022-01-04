const jwt = require("jsonwebtoken")

const Auth = async function (req, res, next) {
    try {

   const authHeader= req.headers['authorization']
   if(!authHeader)
   {
       return res.status(400).send({status:false,message:"Bearer token is missing"})
   }
   const bearerToken=authHeader.split(' ')
   const token=bearerToken[1]
    let decodedtoken = jwt.verify(token, 'project6')
    if (decodedtoken) {
        req.user = decodedtoken.userId
        next()
        }
        
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




module.exports.Auth = Auth