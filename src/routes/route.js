const express = require('express');

const router = express.Router();



const authmiddleware= require("../middleware/authmiddleware")

const userController=require("../controllers/userController")


router.post('/registerUser', userController.registerUser)

router.post('/loginUser',userController.loginUser)

 router.get('/users/:userId',authmiddleware.tokenCheck,userController.getUserDetails )

router.put('/users/:userId',authmiddleware.tokenCheck,userController.putuserDetails)


module.exports = router;