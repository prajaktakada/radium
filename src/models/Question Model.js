const mongoose = require('mongoose')


const QuestionSchema = new mongoose.Schema({

    description: {type: String,required: true,trim:true},
    tag: [{type:String}],
    askedBy:{type:mongoose.Types.ObjectId,refs:'UserDB',required:true},
    deletedAt: {type:Date},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type: Date,default: Date.now},
    updatedAt:{type:Date, default:Date.now}

},{ timestamps: true })


module.exports = mongoose.model('QuestionDB', QuestionSchema)