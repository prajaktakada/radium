const BlogsModel = require("../models/Blogs_Model")
const AuthorModel = require("../models/Author_Model")
const mongoose = require("mongoose")

//phase-1
//2.POST /blogs
const createBlogs = async function (req, res) {

    let data = req.body

    let Author = await AuthorModel.findById(data.authorId)
    if (!Author) {
        res.status(400).send({ status: false, message: "Author_Id not found" })
    } else {
        let savedblog = await BlogsModel.create(data)
        res.status(201).send({ status: true, data: savedblog })
    }
}

//3.GET /blogs
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
            res.status(404).send({ err: "provide an valid Input details" })
        }
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }


}

//4.PUT /blogs/:blogId
const update = async function (req, res) {

    let userbody = await BlogsModel.findOne({_id: req.params.blogId})
    if (userbody){
        if (userbody.isDeleted === false){
        
            let tempbody = await BlogsModel.findOneAndUpdate({_id : userbody._id} , {$set:{"title" : req.body.title, "body": req.body.body,  "category": req.body.category},  $push:{"tags": req.body.tags, "subcategory": req.body.subcategory }}, {new : true})
            
            
            if (req.body.isPublished === true){
                let newdata = await BlogsModel.findOneAndUpdate({_id : userbody._id} , {$set:{"isPublished" : req.body.isPublished, "publishedAt": Date.now()}}, {new : true})
                res.status(200).send({status : true, data: newdata})
            }

            else{
                res.status(200).send({status : true, data: tempbody})

            }
            
        }

        else{
            res.status(404).send({err: "the data is already deleted "})
        }
    }

    else{
        res.status(505).send({status: false , err: " "})
    }


}

//5.DELETE /blogs/:blogId
const DeleteBlogs = async function (req, res) {

    let blogId = req.params.deleteId
    let checking = await BlogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: Date() })
    if (checking) {
        res.status(200).send({ msg: "Update done" })

    } else {
        res.status(404).send({ status: false, msg: "Invalid BlogId" })
    }
}

//5.DELETE /blogs?queryParams
const DeleteBlogsbyParam = async function (req, res) {
    let info = req.query
    let userbody = await BlogsModel.findOne(info)
    let tempdata=await BlogsModel.findOneAndUpdate({id:userbody._id, isDeleted:false},{isDeleted: true, deletedAt: Date() })
    if (tempdata){
    
        res.status(200).send({err: "Done", data: {}})
        }else{
            res.status(404).send({err: "data might have been already deleted"})
        }
}

module.exports.createBlogs = createBlogs
module.exports.DeleteBlogs = DeleteBlogs
module.exports.getBlogs = getBlogs
module.exports.update = update
module.exports.DeleteBlogsbyParam = DeleteBlogsbyParam