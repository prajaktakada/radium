
//Books Model BookModel.js

const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema({

    title: {
        type: String,
        required:'title is required',
        unique: true,
        trim:true
    },
    excerpt: {
        type: String,
        required:'excerpt is required',
        trim:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'userID is required',
        trim:true
    },

    
    ISBN: {
        type: String,
        required:'ISBN is required',
        unique: true,
        trim:true
    },

    category: {
        type: String,
        required:'category is required',
        trime:true
    
    },

    subcategory: {
        type:String,
        required:'subcategory is required',
        trim:true
    },

    reviews: {
        type:Number,
        default: 0
    //     comment:{
    //      type:ObjectId
        //ref:'Review'
        //default:0

    //  }
    },

    deletedAt: {

        type: Date,
        // type: Date.now(),
        default: null
        
    }, 

    isDeleted:{
        type: Boolean,
        default: false
    },

    releasedAt:{

        type: Date,
        default: Date.now(),
        required:'releasedat is required'

    }


}, { timestamps: true })

module.exports = mongoose.model('Books', BooksSchema )

    


    

   

