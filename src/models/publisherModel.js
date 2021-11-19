
//task 4.. Write a post api that creates a publisher resource from the details in the request body

const mongoose=require('mongoose')

const publisherSchema=new mongoose.Schema({
   
    name: String,
    headQuarte:String
    
}, {timestamps: true} )

module.exports = mongoose.model( 'Publisher',publisherSchema )