const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema= new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    prices:Number,
    rating:Number,

    author: {       //yeshi name humae populate ke under likha hai
        type: ObjectId,
        ref: 'MyAuthor'
    }
   
   
    

}, {timestamps: true} )

module.exports = mongoose.model( 'MyBook', bookSchema ) 