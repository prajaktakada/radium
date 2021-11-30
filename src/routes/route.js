const express = require('express');

const router = express.Router();

const AuthorController=require("../controllers/authorcontroller")
const BlogsController=require("../controllers/blogscontroller")

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
//phase -1
router.post('/createAuthor',AuthorController.createAuthor)
router.post('/createBlogs',BlogsController.createBlogs)
router.get('/getBlogs',BlogsController.getBlogs)
router.put('/update/:blogId',BlogsController.update)
router.delete('/DeleteBlogs/:deleteId',BlogsController.DeleteBlogs)
router.delete('/DeleteBlogsbyParam',BlogsController.DeleteBlogsbyParam)

module.exports = router;