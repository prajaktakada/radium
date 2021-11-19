const  myAuthorModel= require("../models/myAuthorModel.js")

//task 1>  Write a create author api that creates an author from the details in request body
const createmyAuthor= async function (req, res) {
     var data= req.body
    let savedData= await myAuthorModel.create(data)
    res.send({msg: savedData})
}




module.exports.createmyAuthor= createmyAuthor
