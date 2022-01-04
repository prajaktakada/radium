const UserModel = require("../models/User Model")
const QuestionModel = require("../models/Question Model")
const mongoose = require("mongoose")
const validate = require("../Util/Validation");
const AnswerModel = require("../models/Answer Model");


const questionDoc = async (req, res) => {
    try {

        const requestbody = req.body;
        let TokenDetail=req.user
        
        if (!validate.isValidRequestBody(requestbody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters' });
            return
        }
        if (!validate.isValidObjectId(requestbody.askedBy)) {
            res.status(400).send({ status: false, message: `Please enter correct UserId` })
            return
        }

        let UserFound = await UserModel.findById(requestbody.askedBy)
        if (!UserFound) {
            res.status(400).send({ status: false, message: `No Userfound with given UserId` })
            return
        }
        if (!(TokenDetail == requestbody.askedBy)) {
            return res.status(403).send({ status: false, message: "userId does not match with token" })
        }


     
        let { description, tag, askedBy } = requestbody;

        if (!validate.isValid(description)) {
            res.status(400).send({ status: false, message: `description is required` })
            return
        };

        let data = { description, askedBy }
        if (tag) {
            if (Array.isArray(tag)) {
                data['tag'] = [...tag]
            }
            if (Object.prototype.toString.call(tag) === "[object String]") {
                data['tag'] = [tag]
            }
        }
        const doc = await QuestionModel.create(data);
        return res.status(201).send({ status: true, data: doc })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getQuestions = async (req, res) => {
    try {
        let filterQuery = { isDeleted: false }
        let querybody = req.query;

        const { tag, sort } = querybody;

        if (validate.isValid(tag)) {
            const tagArr = tag.split(',')
            filterQuery['tag'] = { $all: tagArr }
        }

        if (validate.isValid(sort)) {
            if (sort == "ascending") {
                var data = await QuestionModel.find(filterQuery).lean().sort({ createdAt: 1 })
            }
            if (sort == "descending") {
                var data = await QuestionModel.find(filterQuery).lean().sort({ createdAt: -1 });
            }
        }

        if (!sort) {
            var data = await QuestionModel.find(filterQuery).lean();
        }

        for (let i = 0; i < data.length; i++) {
            let answer = await AnswerModel.find({ questionId: data[i]._id }).select({ text: 1, answeredBy: 1})
            data[i].answers = answer
        }
        return res.status(200).send({ status: true, Details: data });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const getquestionId = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (!validate.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, message: `${questionId} is not a valid product id` })
        }

        const Question = await QuestionModel.findOne({ _id: questionId, isDeleted: false }).lean();

        if (!Question) {
            return res.status(404).send({ status: false, message: `Question does not exit` })
        }
        let answer = await AnswerModel.find({ questionId: questionId }).select({ text: 1, answeredBy: 1 })
        Question.answers=answer;

        return res.status(200).send({ status: true, message: 'Success', data: Question })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const updateQuestion = async (req, res) => {
    try {

        const questionId = req.params.questionId;
        requestBody = req.body;
        TokenDetail = req.user

        if (!validate.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, message: `${questionId} is not a valid product id` })
        }

        const Question = await QuestionModel.findOne({ _id: questionId, isDeleted: false });

        if (!Question) {
            return res.status(404).send({ status: false, message: `Question does not exit` })
        }


        if (!(TokenDetail == Question.askedBy)) {
            return res.status(403).send({ status: false, message: "userId does not match with taken" })
        }

        if (!validate.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'No paramateres passed. Question unmodified' })
        }

        let { description, tag } = requestBody

        const updatedQuestion = {}
        if (validate.isValid(description)) {
            if (!Object.prototype.hasOwnProperty.call(updatedQuestion, '$set')) updatedQuestion['$set'] = {}
            updatedQuestion['$set']['description'] = description
        }
        if (validate.isValid(tag)) {
            if (!Object.prototype.hasOwnProperty.call(updatedQuestion, '$set')) updatedQuestion['$set'] = {}
            if (Array.isArray(tag)) {
                updatedQuestion['tag'] = [...tag]
            }
            if (Object.prototype.toString.call(tag) === "[object String]") {
                updatedQuestion['tag'] = [tag]
            }
        }
        updatedQuestion.updatedAt = new Date();
        const updated = await QuestionModel.findOneAndUpdate({ _id: questionId }, updatedQuestion, { new: true })
        return res.status(200).send({ status: true, message: 'Question updated successfully', data: updated });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        TokenDetail = req.user
        if (!validate.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, message: `${questionId} is not a valid question id` })
        }

        const QuestionFound = await QuestionModel.findOne({ _id: questionId })
        if (!QuestionFound) {
            return res.status(404).send({ status: false, message: `Question Details not found with given questionId` })
        }

        if (QuestionFound.isDeleted == true) {
            return res.status(404).send({ status: false, message: "This Question no longer exists" });
        }
        if (!(TokenDetail == QuestionFound.askedBy)) {
            return res.status(403).send({ status: false, message: "userId does not match with taken" })
        }

        await QuestionModel.findOneAndUpdate({ _id: questionId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        return res.status(200).send({ status: true, message: `Question deleted successfully` })
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}




module.exports = { questionDoc, getQuestions, getquestionId, updateQuestion, deleteQuestion }
