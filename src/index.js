const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
const midGlb= function (req, res, next) {
    console.log("Hi I am a GLOBAL middleware");

    // console.log(req.ip); //::ip
    // console.log(req.originalUrl)
    //logic
    next()    
}
// called as global middleware

const assignmentMW=function(req,res,next){
var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

let ip=req.ip
let url=req.originalUrl

// console.log('${datetime}, ${ip}, ${url}');
console.log(datetime ,ip, url);

next();
}
app.use(assignmentMW)
//
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/<PrajaktaKadamDB>-database?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});