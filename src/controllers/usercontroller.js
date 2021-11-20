const UserModel= require("../models/userModel.js")



const basicCode= async function (req, res) {
    console.log("Hey man, congrats you have reached the Handler")
    res.send({msg: "This message is coming from controller(handler)"})    
}



const createUser= async function (req, res) {   
   var data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})    
}


const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.basicCode= basicCode
