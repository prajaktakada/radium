const AuthorModel = require("../models/Author_Model")
const mongoose = require("mongoose")

//1.Author APIs /authors
const createAuthor = async function (req, res) {

    const data = req.body
    let savedAuthor = await AuthorModel.create(data)
    res.status(200).send({ status: true, data: savedAuthor })
}

module.exports.createAuthor=createAuthor