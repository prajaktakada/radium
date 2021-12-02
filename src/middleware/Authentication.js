const jwt = require("jsonwebtoken")

const Auth = async function (req, res, next) {
    try {

        let token = req.headers['x-api-key']
        if (!token) {
            res.status(401).send({ status: false, Message: 'Mandatory authentication token is missing.' })
        } else {
            let decodedtoken = jwt.verify(token, "Group4")
            if (decodedtoken) {
                req.user = decodedtoken
                // console.log(decodedtoken)
                next()
            }
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.Auth = Auth