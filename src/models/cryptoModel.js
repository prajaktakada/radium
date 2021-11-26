
const mongoose=require('mongoose')

const cryptoSchema=new mongoose.Schema({

        symbol:{type:String,unique:true }, // String and Unqiue
        
        name:{type:String,unique:true },// String and Unqiue
        
        marketCapUsd:{type:String},// String  ( not Number)
        
        priceUsd:{type:String}//String
        
        
}, {timestamps: true} )

module.exports = mongoose.model( 'Crypto',cryptoSchema ) 