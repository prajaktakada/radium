const mongoose=require('mongoose')

const book2Schema= new mongoose.Schema({

    name:String,

    author_id:{
        type:Number,
        required:true
    },

    price:Number,

    ratings:Number

}, {timestamps: true} )

module.exports = mongoose.model( 'Book2', book2Schema ) 