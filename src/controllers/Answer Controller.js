const AnswerModel = require("../models/Answer Model");
const UserModel = require("../models/User Model");
const QuestionModel = require("../models/Question Model")
const mongoose = require("mongoose")
const validate = require("../Util/Validation");


const createAnswer = async (req, res) => {
    try {
        let requestbody = req.body;
        let TokenDetail = req.user

        if (!validate.isValidRequestBody(requestbody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters' });
            return
        }

        if (!(TokenDetail == requestbody.answeredBy)) {
            res.status(400).send({ status: false, message: "userId in url param and in token is not same" })
        }

        let { answeredBy, text, questionId } = requestbody;

        if (!validate.isValidObjectId(answeredBy)) {
            return res.status(400).send({ status: false, message: `${answeredBy} is not a valid User id` })
        }

        const UserFound = await UserModel.findById({ _id: answeredBy })
        if (!UserFound) {
            return res.status(404).send({ status: false, message: `User Details not found with given userId` })
        }

        if (!validate.isValid(text)) {
            res.status(400).send({ status: false, message: `text is required` })
            return
        }
        if (!validate.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, message: `${questionId} is not a valid Question id` })
        }

        const QuestionFound = await QuestionModel.findOne({ _id: questionId, isDeleted: false })
        if (!QuestionFound) {
            return res.status(404).send({ status: false, message: `Question Details not found with given questionid` })
        }

        let data = { answeredBy, text, questionId };
        let createAns = await AnswerModel.create(data);
        return res.status(201).send({ status: true, data: createAns })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getAnswer = async (req, res) => {
    let questionId = req.params.questionId;
    let answerId = req.params.answerId;

    if (!validate.isValidObjectId(questionId)) {
        return res.status(400).send({ status: false, message: `${questionId} is not a valid question id` })
    }

    const QuestionFound = await QuestionModel.findOne({ _id: questionId, isDeleted: false })
    if (!QuestionFound) {
        return res.status(404).send({ status: false, message: `Question Details not found with given questionId` })
    }
    if (!validate.isValidObjectId(answerId)) {
        return res.status(400).send({ status: false, message: `${answerId} is not a valid answer id` })
    }

    const AnswerFound = await AnswerModel.find({ questionId: questionId })
    if (!AnswerFound) {
        return res.status(404).send({ status: false, message: `Question Details not found with given questionId` })
    }
    if (AnswerFound.isDeleted == true) {
        return res.status(400).send({ status: false, message: "Answer no linger exists" })
    }
    return res.status(200).send({ status: false, Detils: AnswerFound })

}

const updateAnswer = async (req, res) => {
    try {

        requestbody = req.body;
        let TokenDetail = req.user

        if (!validate.isValidRequestBody(requestbody)) {
            res.status(400).send({ status: false, message: 'Request Body is missing' });
            return
        }

        if (!validate.isValidObjectId(requestbody.answerId)) {
            return res.status(400).send({ status: false, message: `${answerId} is not a valid answer id` })
        }

        const AnswerFound = await AnswerModel.findOne({ _id: requestbody.answerId })
        if (!AnswerFound) {
            return res.status(404).send({ status: false, message: `Question Details not found with given questionId` })
        }
        if (AnswerFound.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Answer no linger exists" })
        }

        if (!(TokenDetail == AnswerFound.answeredBy)) {
            return res.status(400).send({ status: false, message: "You are trying to update other user answer" })
        }
        const { answerId, text } = requestbody;
        if (!validate.isValid(text)) {
            return res.status(400).send({ status: false, message: "Please provide valid text" })
        }
        let data = { text: text, UpdatedAt: new Date() }
        let update = await AnswerModel.findOneAndUpdate({ _id: answerId }, data, { new: true })
        return res.status(200).send({ status: true, message: 'Updated Successfully', data: update })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deleteAnswer = async (req, res) => {
    try {
        let requestbody = req.body;
        let TokenDetail = req.user;
        if (!validate.isValidRequestBody(requestbody)) {
            res.status(400).send({ status: false, message: 'Please provide userId and questionId' });
            return
        }
        let { userId, questionId } = requestbody

        if (!(TokenDetail == userId)) {
            return res.status(400).send({ status: false, message: "You are trying to delete other user answer" })
        }
        await AnswerModel.findOneAndUpdate({ answeredBy: userId, questionId: questionId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        return res.status(200).send({ status: true, message: `Answer deleted successfully` })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createAnswer, getAnswer, updateAnswer, deleteAnswer }