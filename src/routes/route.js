const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")
const bookModel=require("../models/bookModel")

const UserController= require("../controllers/userController")
const BookController=require("../controllers/bookcontroller") 


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createUser',  UserController.createUser  ); 
router.get('/getAllUsers',  UserController.getUsersData  );

//book API
router.post('/createBook',  BookController.createBook  );
router.get('/bookList',  BookController.allBooksList  );
router.post('/getParticularBooks',  BookController.particularBooks  );
 router.post('/getBooksInYear',BookController.yearDetails);
router.get('/getXINRBooks',  BookController.priceDetails  );
router.get('/getRandomBooks', BookController.randomBooks  );



module.exports = router;