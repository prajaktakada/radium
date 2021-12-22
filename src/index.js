const express = require('express');
const multer = require('multer')//
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')
app.use(multer().any()) //
app.use('/', route);
mongoose.connect(" mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/Room-15?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))




app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});

