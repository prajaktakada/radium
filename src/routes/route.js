const express = require('express');

const router = express.Router();

const UserController=require("../controllers/User Controller")
const Middleware=require("../Middleware/Authenticate")
const QuestionController=require("../controllers/QuestionController")
const AnswerController=require("../controllers/Answer Controller")
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/register',UserController.createUser)
router.post('/login',UserController.loginUser)
router.get('/user/:userId/profile',Middleware.Auth,UserController.getUserDetails)
router.put('/user/:userId/profile',Middleware.Auth,UserController.UpdateUser)

router.post('/question',Middleware.Auth,QuestionController.questionDoc)
router.get('/questions',QuestionController.getQuestions)
router.get('/questions/:questionId',QuestionController.getquestionId)
router.put('/questions/:questionId',Middleware.Auth,QuestionController.updateQuestion)
router.delete('/questions/:questionId',Middleware.Auth,QuestionController.deleteQuestion)


router.post('/answer',Middleware.Auth,AnswerController.createAnswer)
router.get('/questions/:questionId/answers/:answerId',AnswerController.getAnswer)
router.put('/answer',Middleware.Auth,AnswerController.updateAnswer)
router.delete('/answer',Middleware.Auth,AnswerController.deleteAnswer)
module.exports = router;