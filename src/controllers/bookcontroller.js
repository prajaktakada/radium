const bookModel= require("../models/bookModel.js")

// Task 1- Create a collection of 11+ books.

const createBook=async function (req,res){
    var book=req.body
    let savedBook= await bookModel.create(book)
    res.send({msg: savedBook})  
}

// Task 2- return all the bookName and authorName only
const allBooksList= async function (req, res) {
    let list = await bookModel.find().select({ bookName: 1, authorName: 1, _id: 0 })
    res.send({ msg: list })
}

// Task 3- Return all those bookName which published in a inputed year
const yearDetails = async function (req, res) {
    let yearList= await bookModel.find({ year: req.body.year }).select({bookName:1,_id:0})
    res.send(yearList)
 }

 
 // Task 4- send the reponse after satisfying the condition to bookName and year.
const particularBooks = async function (req, res) {
    let specificBooks = await bookModel.find(req.body)
    res.send(specificBooks)
}

// Task 5- send bookName of those book only which have indianprice of 100 inr or 200 inr or 500 inr.
const priceDetails= async function(req,res){
    let list = await bookModel.find({$or: [{"prices.indianPrice":"100 INR"},{"prices.indianPrice":"200 INR"},{"prices.indianPrice":"500 INR"}]}).select({bookName:1,_id:0})
    res.send({ msg: list })
}

//task 6- Send the details of those books which are in stock or having more than 500 pags.
const randomBooks= async function(req, res) {
    let allBooks = await bookModel.find({$or:[ {stockAvailable: true},{ totalPages: {$gt: 500}}]})
    res.send({msg: allBooks })
}


 module.exports.createBook = createBook;
 module.exports.allBooksList = allBooksList;
 module.exports.yearDetails = yearDetails;
 module.exports.particularBooks = particularBooks;
 module.exports.priceDetails = priceDetails;
 module.exports.randomBooks = randomBooks;