//
// { title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, 
// category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]}, 
// subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, 
// createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false},
//  publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}

const mongoose = require('mongoose')

const BlogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorsDB',
        required: true
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: [String],
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    updatedAt:
    {
        type: Date,
        default: null
    },
    deletedAt:
    {
        type: Date,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('BlogsDB', BlogsSchema)

    


    

   

