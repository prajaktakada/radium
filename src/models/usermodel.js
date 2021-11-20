const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        unique: true,
        required: true
    }, //schema level validation
    emailId: String, 
    gender: {type: String, enum: ['male', 'female', 'LGBTQ'] }, // falana will give an error 
    age: Number,

    // isIndian: Boolean,
    // parentsInfo : { motherName: String, fatherName: String , siblingName: String },
    // cars: [ String ]

}, {timestamps: true} )


// SCHEMA: definition ( data definition- what will your data look like i.e the fields in your data)
// MODEL: functionality ( it enables us to create view modify our data )


module.exports = mongoose.model( 'User',userSchema ) //users in database

// String, Number
// Boolean, Object/json, array