const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const appMiddleware = require('../middlewares/appMiddleware')

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/users', appMiddleware.validateAppType, userController.createUser);
router.post('/products', productController.createProduct);
router.post('/orders', appMiddleware.validateAppType, orderController.createOrder);

module.exports = router;














// const express = require('express');
// const router = express.Router();



// const appMiddleware = require("../middlewares/appMiddleware");
// const userController = require("../controllers/userController");
// const productController = require("../controllers/productController");
// const orderController = require("../controllers/orderController");

// router.post("/users", appMiddleware.validateAppType, userController.createUser);
// router.post("/products", productController.createProduct);
// router.post("/orders",appMiddleware.validateAppType,orderController.createOrder)















// // const productcontroller=require("../controllers/productcontroller")
// // const  UserController= require ("../controllers/usercontroller")
// // const commonMiddlewares=require('../middlewares/commonMiddlewares')
// // const ordercontroller=require('../controllers/ordercontroller')

// // router.post('/createproduct',productcontroller.createproduct)
// // // router.post('/capturedInfo',commonMiddlewares.capturedInfo)

// // router.post('/createUser',commonMiddlewares.capturedInfo,UserController.createUser)

// // router.post('/createorder',ordercontroller.createorder)


// // router.get('/getUsersData', UserController .getUsersData)

// module.exports = router;