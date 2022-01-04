const mongoose = require('mongoose')


const AnswerSchema = new mongoose.Schema({

    answeredBy: {type:mongoose.Types.ObjectId,refs:'UserDB',required:true},
    text: {type:String,required:true,trim:true},
    questionId:{type:mongoose.Types.ObjectId,refs:'QuestionDB',required:true},
    deletedAt: {type:Date},
    isDeleted:{type:Boolean},
    createdAt:{type: Date,default: Date.now},
    updatedAt:{type:Date, default:Date.now}

},{ timestamps: true })


module.exports = mongoose.model('AnswerDB', AnswerSchema)