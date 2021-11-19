const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema= new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
   author: {       //yeshi name humae populate ke under likha hai
        type: ObjectId,
        ref: 'MyAuthor'
    },
    prices:Number,
    rating:Number,

    publisher:{
        type:ObjectId,
        ref:'Publisher'
    }
   
   
    

}, {timestamps: true} )

module.exports = mongoose.model( 'MyBook', bookSchema ) 
