const BlogsModel = require("../models/Blogs_Model")
const AuthorModel = require("../models/Author_Model")
const mongoose = require("mongoose")

//Authentication
const createBlogs = async function (req, res) {
    try {

        let data = req.body
        let Author = await AuthorModel.findById(data.authorId)
        if (!Author) {
            res.status(400).send({ status: false, message: "Author_Id not found" })
        } else {
            let savedblog = await BlogsModel.create(data)
            res.status(201).send({ status: true, data: savedblog })
        }

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}

//Authentication
const getBlogs = async function (req, res) {
    try {

        let info = req.query
        let data = await BlogsModel.findOne(info)
        if (data) {
            if (data.isDeleted == false && data.isPublished == true) {
                res.status(200).send({ Status: "Success", Info: data })


            } else {
                res.status(500).send({ err: "either book isn't published or data is deleted" })
            }
        } else {
            res.status(404).send({ err: "please provide valid Query Params in Postman" })
        }

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}

//Authorisation put
const update = async function (req, res) {
    try {
        let decodedUserToken = req.user
        let BlogUser = await BlogsModel.findOne({ _id: req.params.blogId })
        console.log(decodedUserToken.userId)
        console.log(BlogUser.authorId)

        if (decodedUserToken.userId == BlogUser.authorId) { //
            if (BlogUser) {
                if (BlogUser.isDeleted === false) {

                    let tempbody = await BlogsModel.findOneAndUpdate({ _id: BlogUser._id }, { $set: { "title": req.body.title, "body": req.body.body, "category": req.body.category }, $push: { "tags": req.body.tags, "subcategory": req.body.subcategory } }, { new: true })


                    if (req.body.isPublished === true) {
                        let newdata = await BlogsModel.findOneAndUpdate({ _id: BlogUser._id }, { "isPublished": req.body.isPublished, "publishedAt": Date.now() }, { new: true })
                        res.status(200).send({ status: true, data: newdata })
                    }

                    else {
                        res.status(200).send({ status: true, data: tempbody })

                    }

                } else {
                    res.status(404).send({ err: "the data is already deleted " })
                }
            } else {
                res.status(505).send({ status: false, err: " " })
            }
        } else {
            res.status(403).send({ Message: "you are trying to access a different's user account" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

//Authorisation
const DeleteBlogs = async function (req, res) {
    try {
        let decodedUserToken = req.user
        let BlogUser = await BlogsModel.findOne({ _id: req.params.deleteId })
        //userid is equals to author id. for reference see the token genereation api.
        if (decodedUserToken.userId == BlogUser.authorId) {

            let blogId = req.params.deleteId
            let checking = await BlogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: Date() })
            if (checking) {
                res.status(200).send()
            } else {
                res.status(404).send({ status: false, msg: "Invalid BlogId" })
            }
        } else {
            res.status(404).send({ err: "you are trying to access a different's user account" })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

//Authorisation
const DeleteBlogsbyQuery = async function (req, res) {
    try {
        // console.log(req.query.authorId)
        // console.log(req.user.userId)
        if (req.user.userId == req.query.authorId) {
            let info = req.query
            let userbody = await BlogsModel.findOne(info)
            let tempdata = await BlogsModel.findOneAndUpdate({ id: userbody._id, isDeleted: false }, { isDeleted: true, deletedAt: Date() })
            if (tempdata) {

                res.status(200).send()
            } else {
                res.status(404).send({ err: "data might have been already deleted" })
            }
        } else {
            res.status(404).send({ err: "you are trying to access a different's user account" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createBlogs = createBlogs
module.exports.DeleteBlogs = DeleteBlogs
module.exports.getBlogs = getBlogs
module.exports.update = update
module.exports.DeleteBlogsbyQuery = DeleteBlogsbyQuery