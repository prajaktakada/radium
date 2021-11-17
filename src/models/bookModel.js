const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
    bookName:{
     type: String,
     require:true
    },
    
    prices: {
        indianprice:String, 
        europeanprice: String
    },
    
    year:{
      type: Number,
      default:2021
    },
   
    tags: [String],   //array of string
    
    authorName:String,

    totalPages:Number,
   
    stockAvailable:{
      type:Boolean
    },
   
    ISBN:{
        type:String,
        require:true
    },
    
    category:String,
      
    isPublished:{
        type:Boolean,
        default:false
    }
    
},{timestamps: true})

module.exports=mongoose.model("Book",bookSchema) 