const BookModel = require("../models/BookModel.js")
const ReviewModel = require("../models/ReviewModel.js")
const mongoose = require('mongoose')

const isValid = function (value) {

    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidrequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


//POST /books/:bookId/review
const bookreview = async function (req, res) {
    try {

        const requestBody = req.body
        const bookId = req.params.bookId

        if(!isValidObjectId(bookId)){
            res.status(400).send({status: false, msg: `Invalid request. No request passed in the query`}) 
            return
        }

        const book = await BookModel.findOne({ _id:bookId,isDeleted:false })

        console.log(book)
        if (!book) {
            res.status(404).send({ status: false, message: `book not found` })
            return
        }

        if (!isValidrequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'request body is not found' })
        }

        //extract params
        const { reviewedBy, reviews, rating, isDeleted } = requestBody

        if (!isValid(reviews)) {
            res.status(400).send({ status: false, message: 'reviews required' })
            return
        }

        if (!isValid(rating)) {
            res.status(400).send({ status: false, message: 'rating required' })
            return
        }

        if (!((rating > 0) && (rating < 6))) {
            res.status(400).send({ status: false, message: 'rating is required between 1 to 5' })
            return
        }
        //validation end

        const ReviewData = { reviewedBy, reviews, rating, isDeleted, bookId }

        let savedReview = await ReviewModel.create(ReviewData)
        await BookModel.findOneAndUpdate({ _id: bookId }, { $inc: { "reviews": 1 } }, { new: true })
        res.status(200).send({ status: true, message: 'Review created succesfully', data: savedReview })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })

    }
}

module.exports.bookreview = bookreview




//PUT /books/:bookId/review/:reviewId
const updateReviews = async function (req, res) {
    try {
        let reqBody = req.body;
        let reqParam = req.params;
        let reviewId = reqParam.reviewId;
        let bookId = reqParam.bookId;

        if (!isValidObjectId(bookId)) {
            res.status(400).send({ status: false, message: `${bookId} is not a valid book id` });
            return;
        }

        if (!isValidObjectId(reviewId)) {
            res.status(400).send({ status: false, message: `${reviewId} is not a valid review id` });
            return;
        }

        const findBooks = await BookModel.findOne({ _id: bookId, isDeleted: false });

        if (!findBooks) {
            res.status(404).send({ status: false, message: "no books found" });
            return;
        }

        const findReviews = await ReviewModel.findOne({ _id: reviewId, isDeleted: false });

        if (!findReviews) {
            res.status(404).send({ status: false, message: "no reviews found" });
            return;
        }

        const { reviews, rating, reviewedBy } = reqBody;

        if (!isValid(reviews)) {
            res.status(400).send({ status: false, message: "please! enter valid reviews" });
            return;
        }

        if (!isValid(rating)) {
            res.status(400).send({ status: false, message: "please! enter valid rating" });
            return;
        }

        if (!(rating > 0 && rating < 6)) {
            res.status(400).send({ status: false, message: "rating must be 1 to 5" });
            return;
        }

        // if (!isValid(reviewedBy)) {
        //     res.status(400).send({ status: false, message: "please enter valid user name" });
        //     return;
        // }

        if (!isValidrequestBody(reqBody)) {
            res.status(200).send({ status: true, message: "No paramateres passed. Blog unmodified", data: blog });
            return;
        }

        //  let updateData = { reviews,rating,reviewedBy};

        let getUpdateReview = await ReviewModel.findOneAndUpdate({ _id: reviewId },
            { reviews: reviews, rating: rating, reviewedBy: reviewedBy }, { new: true });
        res.status(200).send({ status: true, message: "review successfully Updated", data: getUpdateReview });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports.updateReviews = updateReviews;


//DELETE /books/:bookId/review/:reviewId
const deleteReviewOfBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        let findReview = await ReviewModel.findOne({ _id: reviewId, isDeleted: false })
        console.log(findReview)
       
        
        let findBook = await BookModel.findOne({ _id: bookId })
        // console.log(findBook)


        if (!findReview) {
            return res.status(404).send({ status: false, msg: `no reviews found whith this ${reviewId} id` })
        }

        if (!findBook) {
            return res.status(404).send({ status: false, msg: `no book found with this ${bookId} id` })
        }

        let deleteReview = await ReviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, { isDeleted: true, deletedAt: Date() })
        if (deleteReview) {
            res.status(200).send({ status: true, msg: 'review is deleted successful' })
            await BookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: -1 } })
            return
        } else {
            res.status(404).send({ status: false, msg: "review not present" })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




module.exports.deleteReviewOfBook = deleteReviewOfBook










