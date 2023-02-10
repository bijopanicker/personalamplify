
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// import mongoose from 'mongoose';

const mongoose = require('mongoose')



// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const port = 3000 ;




const mongodbUri = 'mongodb+srv://bijo:TfE68elk91rxn7zV@cluster0.gbjr68m.mongodb.net/gamedata';

mongoose.connect(mongodbUri);

const sch = {
    RandomNumber:Number,
    wrongAttemptCountArray:Array,
    }
const monmodel = mongoose.model("cardgamedata",sch);

const sch1 = {
    totalTime:Number,
    unixTime:Number,
    }
const monmodel1 = mongoose.model("timedata",sch1);

const sch2 = {
    pinCode:Number,
    distance:Number,
    }
const monmodel2 = mongoose.model("liftdata",sch2);


app.post("/postcardgamedata",async(req,res)=>{
    // console.log("inside post function");
    const data = new monmodel({
        RandomNumber:req.body.RandomNumber,
        wrongAttemptCountArray:req.body.wrongAttemptCountArray,
    })
    const val = await data.save();
    res.json(val);
})

app.post("/postsomeotherdata",async(req,res)=>{
    // console.log("inside post function");
    const data = new monmodel1({
        totalTime:req.body.totalTime,
        unixTime:req.body.unixTime,
    })
    const val = await data.save();
    res.json(val);
})


app.post("/postliftdata",async(req,res)=>{
    // console.log("inside post function");
    const data = new monmodel2({
        pinCode:req.body.pinCode,
        distance:req.body.distance,
    })
    const val = await data.save();
    res.json(val);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// 10.187.27.14

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////









/**********************
 * Example get method *
 **********************/

// app.get('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

/****************************
* Example post method *
****************************/

// app.post('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// app.post('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

/****************************
* Example put method *
****************************/

// app.put('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

/****************************
* Example delete method *
****************************/

// app.delete('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.listen(3000, function() {
//     console.log("App started")
// });

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
