const express = require('express');
const router = express.Router();

const cowinController= require("../controllers/cowinController")
const whetherController=require("../controllers/whetherController")

router.get("/cowin/states", cowinController.getStatesList)
router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)
router.get("/cowin/centers", cowinController.getByPin)
router.post("/cowin/getOtp", cowinController.getOtp)

router.get('/wetheroflondon',whetherController.wetheroflondon)
router.get('/tempratureoflondon',whetherController.tempratureoflondon)
router.get('/getWeather',whetherController.getWeather )






module.exports = router;