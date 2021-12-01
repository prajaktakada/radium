//
//{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }


const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },

            message: "Please enter a valid email"

        },
    }


    },{ timestamps: true })

module.exports = mongoose.model('AuthorsDB', AuthorSchema)