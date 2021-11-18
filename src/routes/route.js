const express = require('express');
const router = express.Router();



const myAuthorController=require("../controllers/myAuthorController")
const myBookController=require("../controllers/myBookController")
router.post('/createmyAuthor',myAuthorController.createmyAuthor)
router.post('/createMyBook',myBookController.createMyBook)
router.get('/getBooks',myBookController.getBooks)

module.exports = router;