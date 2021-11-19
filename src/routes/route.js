const express = require('express');
const router = express.Router();



const myAuthorController=require("../controllers/myAuthorController")
const myBookController=require("../controllers/myBookController")
const publisherController=require("../controllers/publisherController")

router.post('/createmyAuthor', myAuthorController.createmyAuthor)
router.post('/createMyBook', myBookController.createMyBook)
router.post('/ bookwthauthorpublisher',myBookController.bookwthauthorpublisher)
router.get('/getBooks', myBookController.getBooks)

router.post('/createpublisher',publisherController.createpublisher)
module.exports = router;