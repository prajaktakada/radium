const express = require('express');

const router = express.Router();

const AuthorController=require("../controllers/authorcontroller")
const BlogsController=require("../controllers/blogscontroller")
const Middleware=require("../middleware/Authentication")

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
//
router.post('/createAuthor',AuthorController.createAuthor)
router.post('/createBlogs',Middleware.Auth,BlogsController.createBlogs)
router.get('/getBlogs',Middleware.Auth,BlogsController.getBlogs)
router.put('/update/:blogId',Middleware.Auth,BlogsController.update)
router.delete('/DeleteBlogs/:deleteId',Middleware.Auth,BlogsController.DeleteBlogs)
router.delete('/DeleteBlogsbyQuery',Middleware.Auth,BlogsController.DeleteBlogsbyQuery)
router.post('/login',AuthorController.login)

module.exports = router;