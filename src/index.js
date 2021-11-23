const express = require('express');
  const moment =require('moment')
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

// const gbMiddleware = require("./middlewares/globalMiddleware");
// const gbMiddleware = require("./middlewares/appMiddleware")
//
const appMiddleware= require("./middlewares/appMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')

mongoose.connect(" mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/PrajaktaKadamDB?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);
//
// app.use(commonMiddlewares.isfreeapp )

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});
  

