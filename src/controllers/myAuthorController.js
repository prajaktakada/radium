const  myAuthorModel= require("../models/myAuthorModel.js")

const createmyAuthor= async function (req, res) {
     var data= req.body
    let savedData= await myAuthorModel.create(data)
    res.send({msg: savedData}) 
}




module.exports.createmyAuthor= createmyAuthor
