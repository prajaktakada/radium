const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    fname: {type: String,required: true,trim:true},
    lname: {type: String,required: true,trim:true},
    email: { type: String,required: true,unique: true},
    phone:{type:String,trim: true,unique:true},
    password:{type: String,required: true,},
    createdAt:{type: Date,default: Date.now},
    updatedAt:{type:Date, default:Date.now}

},{ timestamps: true })


module.exports = mongoose.model('UserDB', UserSchema)