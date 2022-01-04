const UserModel = require("../models/User Model")
const mongoose = require("mongoose")
const validate = require("../Util/Validation")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const createUser = async function (req, res){
    try{

    let requestbody = req.body;
    if (!validate.isValidRequestBody(requestbody)) {
        res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide user details' })
        return
    }

    let { fname, lname, email, phone, password } = requestbody;
     //  Validation starts
     if (!validate.isValid(fname)) {
        res.status(400).send({ status: false, message: `fname is required` })
        return
    };
    if (!validate.isValid(lname)) {
        res.status(400).send({ status: false, message: `lname is required ` })
        return
    };
    if (!validate.isValid(email)) {
        res.status(400).send({ status: false, message: `Email is required` })
        return
    };
    email = email.trim().toLowerCase()
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
        res.status(400).send({ status: false, message: `Email should be a valid email address ` })
        return
    };
    const isEmailAlreadyUsed = await UserModel.findOne({ email }); // {email: email} object shorthand property
    if (isEmailAlreadyUsed) {
        res.status(400).send({ status: false, message: `${email} email address is already registered` })
        return
    };
    if (!validate.isValid(phone)) {
        res.status(400).send({ status: false, message: 'phone no is required' })
        return
    };
    

    if (!(/^\(?([1-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone))) {
        res.status(400).send({ status: false, message: `Please fill a valid phone number` })
        return
    };
    const isPhoneAlreadyUsed = await UserModel.findOne({ phone }); //{phone: phone} object shorthand property
    if (isPhoneAlreadyUsed) {
        res.status(400).send({ status: false, message: `${phone} phone number is already registered` })
        return
    };

    
    if (!validate.isValid(password)) {
        res.status(400).send({ status: false, message: `Password is required` })
        return
    };

    if (!(password.length > 7 && password.length < 16)) {
        res.status(400).send({ status: false, message: "password should  between 8 and 15 characters" })
        return
    };


    const userData = { fname, lname, email, phone, password };
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt)

    const newUser = await UserModel.create(userData);
    return res.status(201).send({ status: true, message: ` success`, data: newUser });
} catch (error) {
    res.status(500).send({ status: false, message: error.message });
};
}

const loginUser = async function (req, res) {
    try {

        if (!validate.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, msg: "provide login credentials" })
        };
        let { email, password } = req.body
        if (!validate.isValid(email)) {
            return res.status(401).send({ status: false, msg: "Email is required" })
        };
        email = email.toLowerCase().trim()
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        };
        if (!validate.isValid(password)) {
            res.status(402).send({ status: false, msg: "password is required" })
            return
        };

        const user = await UserModel.findOne({ email: req.body.email })
 
        if (!user) {
            res.status(403).send({ status: false, msg: "invalid email or password, try again with valid login credentials " })
            return
        };

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).send({ msg: "Invalid credential" })
        }

        const token = await jwt.sign({
            userId: user._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3000 * 60
        }, 'project6');
      
        res.status(200).send({ status: true, userId: user._id, token });
        return
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
        return
    };
};

const getUserDetails = async (req, res) => {
    userId = req.params.userId;
    TokenDetail = req.user

    if (!(TokenDetail === userId)) {
        return res.status(403).send({ status: false, message: "userId in url param and in token is not same" })
    }

    if (!validate.isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: `${userId} is not a valid book id` })
    }

    const FoundUser = await UserModel.findOne({ _id: userId, isDeleted: false })
    if (!FoundUser) {
        return res.status(404).send({ status: false, message: `No User found with given User Id` })
    }

    res.status(200).send({ status: true, "message": "User profile details", "data": FoundUser })

}

const UpdateUser = async (req, res) => {
    try{

    userId = req.params.userId;
    const requestBody = req.body;
    TokenDetail = req.user

    if (!validate.isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, message: 'No paramateres passed. Book unmodified' })
    }
    const UserFound = await UserModel.findOne({ _id: userId })


    if (!UserFound) {
        return res.status(404).send({ status: false, message: `User not found with given UserId` })
    }
    if (!(TokenDetail === userId)) {
        res.status(400).send({ status: false, message: "userId in url param and in token is not same" })
    }



    let { fname, lname, email, phone} = requestBody
    if (Object.prototype.hasOwnProperty.call(requestBody, 'fname')){
        if (!validate.isValid(fname)) {
            res.status(400).send({ status: false, message: `fname is required` })
            return
        };
    }
    if (Object.prototype.hasOwnProperty.call(requestBody, 'lname')){
        if (!validate.isValid(lname)) {
            res.status(400).send({ status: false, message: `lname is required` })
            return
        };
    }
    if (Object.prototype.hasOwnProperty.call(requestBody, 'email')) {
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(requestBody.email))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        };

        const isEmailAlreadyUsed = await UserModel.findOne({ email: requestBody.email });
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${requestBody.email} email address is already registered` })
            return
        };
    }
    if (Object.prototype.hasOwnProperty.call(requestBody, 'phone')){
        if (!(/^\(?([1-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone))) {
            res.status(400).send({ status: false, message: `Please fill a valid phone number` })
            return
        };

        const isPhoneAlreadyUsed = await UserModel.findOne({ phone }); //{phone: phone} object shorthand property
        if (isPhoneAlreadyUsed) {
            res.status(400).send({ status: false, message: `${phone} phone number is already registered` })
            return
        };
    }

    requestBody.UpdatedAt = new Date()
    const UpdateData = { fname, lname, email, phone }
    const upatedUser = await UserModel.findOneAndUpdate({ _id: userId }, UpdateData, { new: true })
    res.status(200).send({ status: true, message: 'User updated successfully', data: upatedUser });
    }catch(err)
    {
        return res.status(500).send({status:false,message:err.message})
    }
}




module.exports={createUser,loginUser,getUserDetails,UpdateUser}