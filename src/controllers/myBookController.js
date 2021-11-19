
const myBookModel = require("../models/myBookModel.js");
const  myAuthorModel= require("../models/myAuthorModel.js")
const  publisherModel= require("../models/publisherModel.js")
// const mongoose = require("mongoose");



// const createMyBook = async function (req, res) 
//     let book=req.body
//      let id=req.body.author
    
//   let is_present= await myAuthorModel.findById(id);
//     if(is_present){
//     let savedBook = await myBookModel .create(book)
//     res.send({ msg: savedBook });
//     console.log(savedBook)
//     }else
//     res.send({ msg: "id is not present" });
//   };

//task 2>  Write a create book api that takes author from the request body. You have to first check if 
//authorId is present as well a valid authorId. A valid authorId is which is present in your authors collection.
// Also make sure you receive a publisherId in the request and validate this id. A valid publisherId is which is
// present in your publishers collection.

const createMyBook= async function (req, res) {
    var data= req.body
    let authorId = req.body.author
    let publisherId=req.body.publisher

    let savedData= await myAuthorModel.findById(authorId)
    let val=await publisherModel.findById(publisherId)
    if(savedData){
        if(val){
        let bookcreated =await myBookModel.create(data)
        res.send({data:bookcreated})
        console.log(bookcreated)
        }else{
            res.send("publisher id is not")
        }
    }else{
        res.send("id not valid")
        
    }
}

//task-3 get fetching all the books along with author and publisher
const bookwthauthorpublisher = async function(req,res){
   let bap= await myBookModel.find().populate('author')
    res.send({msg:bap})
}
// task-5 Update the 3rd api (GET /books) such that in the authors details you receive _id, author_name and age
const getBooks = async function (req, res) {
  let allBooks = await myBookModel.find().populate('author',["author_name","age"]);
//5

  res.send({ msg: allBooks});
};

//5

module.exports. createMyBook =  createMyBook;
module.exports.getBooks = getBooks;
module.exports. bookwthauthorpublisher= bookwthauthorpublisher;

