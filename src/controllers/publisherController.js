const  publisherModel= require("../models/publisherModel.js")

const createpublisher= async function (req, res) {
     var data= req.body
    let savedData= await publisherModel.create(data)
    res.send({msg: savedData}) 
}


module.exports.createpublisher= createpublisher