const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")



const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const AssignmentBookController=require("../controllers/assignmentBookController")

//16Nov21 assignment
const book2controller=require("../controllers/authorAndbookcontroller")
// const authorcontroller=require("../controllers/authorAndbookcontroller")

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createBook2',book2controller.createBook2)
router.post('/createAuthor',book2controller.createAuthor)

// router.get('/notAcceptbookAuthor',book2controller .notAcceptbookAuthor)
// router.get('/allauthor',book2controller.allauthor)
router.get('/findbookwthauthor',book2controller.findbookwthauthor)
router.get('/findAllbook',book2controller.findAllbook)
router.post('/findauthorname',book2controller.findauthorname)









router.post('/createUser',  UserController.createUser  );
router.get('/getAllUsers',  UserController.getUsersData  );

router.post('/createBook',  BookController.createBook  );
router.get('/getAllBooks',  BookController.getBooksData  );

// mongo session 3: session/schema-basic3
router.get('/getFirstBook',  BookController.getBook  );
router.post('/updateBooks',  BookController.updateBooks  );

router.post('/deleteBook',  BookController.deleteBook  );


// Previous Day asignment API's
router.post('/createBook',  AssignmentBookController.createBook  );
router.get('/bookList',  AssignmentBookController.allBooksList  );
router.post('/getParticularBooks',  AssignmentBookController.particularBooks  );
 router.post('/getBooksInYear',AssignmentBookController.yearDetails);
router.get('/getXINRBooks',  AssignmentBookController.priceDetails  );
router.get('/getRandomBooks', AssignmentBookController.randomBooks  );



module.exports = router;