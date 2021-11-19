const BookModel = require("../models/book2Model.js");
const AuthorModel=require("../models/authorModel.js")

const createBook2= async function (req, res) {
    var data1= req.body
    let savedData1= await BookModel.create(data1)
    res.send({msg: savedData1})    
}

const createAuthor=async function (req, res) {

    var data2= req.body
    let savedData2= await AuthorModel.create(data2)
    res.send({msg: savedData2})    
}


//Task-> 1 Write create APIs for both books and authors ---> If author_id is not available then
// do not accept the entry(in neither the aurthor collection onr the books collection)
//  const notAcceptbookAuthor=async function(req,res){
//     let allUsers=await BookModel.find({author_id:false})
//     let allauthor=await AuthorModel.find({author_id:false})
//      res.send({msg:allUsers})
 
//  }




//Task->1 List out the books written by Chetan Bhagat

const findbookwthauthor=async function(req,res){
    let allUsers=await AuthorModel.findOne({author_name:"Chetan Bhagat"}).select({author_id:1})
    let savedata=await BookModel.find(allUsers)
    res.send(savedata)

}

//Task->3 find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response
const findauthorname=async function(req,res){
     let allUsers=await BookModel.findOneAndUpdate(req.body,{ price:100},{new:true}).select({author_id:1})
    let savedData2=await AuthorModel .findOne(allUsers).select({author_name:1,author_id:1})
    res.send({authorNameDetaisls:savedData2,updatedBookprice:allUsers})
}


//Task-> 4 Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books
const findAllbook=async function (req, res) {
   
    let allUsers= await BookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0})
    // console.log(allUsers)
    let savedData3=await AuthorModel.find(allUsers.author_id).select({author_name:1})
    res.send({msg: savedData3})
}


module.exports.createBook2=createBook2
module.exports.createAuthor=createAuthor
// module.exports. notAcceptbookAuthor= notAcceptbookAuthor



module.exports.findbookwthauthor=findbookwthauthor
module.exports.findauthorname=findauthorname
module.exports.findAllbook=findAllbook

