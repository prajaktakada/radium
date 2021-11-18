
const myBookModel = require("../models/myBookModel.js");
const  myAuthorModel= require("../models/myAuthorModel.js")
// const mongoose = require("mongoose");

//2>
const createMyBook = async function (req, res) {
    let book=req.body
     let id=req.body.author
    let is_present= await myAuthorModel.findById(id);
    //let a_id = await authorModel.find().select(_id=1);
  
    if(is_present){
    let savedBook = await myBookModel .create(book)
    res.send({ msg: savedBook });
    }else
    res.send({ msg: "id is not present" });
  };

//2>
// const createAuthor= async function (req, res) {
//     var data= req.body
//     let authorId = req.body.author
//     let savedData= await authorModel.findById(authorId)
//     if(savedData){

//         let bookcreared =await bookModel.create(data)
        
//     }else{
//         res.send("id not valid")
//     }
// }





 //q3. get fetching all the books along with author
const getBooks = async function (req, res) {
  let allBooks = await myBookModel.find().populate('author');
  res.send({ msg: allBooks });
};

module.exports. createMyBook =  createMyBook;
module.exports.getBooks = getBooks;

