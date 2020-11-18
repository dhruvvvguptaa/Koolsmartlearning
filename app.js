const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require("mongoose");
// const routes = require('./routes/routes');

const aryabhattaVideosModel = require('./models/AryabhattaVideos');
const tipsAndTricksModel = require('./models/TipsAndTricks');
const coursesModel = require('./models/Courses');
const mentalAbilityModel = require('./models/MentalAbility');
const keysAndSolutionsModel = require('./models/KeysAndSolutions');

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/koolsmartlearning", {useNewUrlParser: true, useUnifiedTopology: true});

// keysAndSolutionsModel.create({
//     ImageSource: "https://www.koolsmartlearning.com/wp-content/uploads/2020/05/ExamplesLogarithm.jpg",
//     Title: "Example Problems on Logarithm",
//     VideoLink: "https://www.youtube.com/watch?v=tSagYa_AZCA",
//     Year: 1,
//     Class: 1
// }, function(err, found){
//     if(err){
//                 console.log(err);
//             }else {
//                 console.log("created");
//             }
// });

// app.use(routes)

//home route
app.get("/", function(req, res){
    res.render("home");
});


//contact us route
app.get("/contact-us", function(req ,res){
    res.render("contactUs");
});

//testimonials route
app.get("/testimonials", function(req, res){
    res.render("testimonials");
});

//Our Experts route
app.get("/our-experts", function(req, res){
    res.render("ourExperts");
});

//About us route
app.get("/about-us", function(req, res){
    res.render("aboutUs");
});

//tips and tricks route
app.get("/tips-and-tricks", function(req, res){
    
    tipsAndTricksModel.find({}, function(err, result) {
        const count = result.length;
        res.render("tipsAndTricks", {
           videos: result,
           count: count
        });        
      });
});

//aryabhatta videos route
app.get("/aryabhatta-videos", function(req, res){
    aryabhattaVideosModel.find({}, function(err, result){
        res.render("aryabhattaVideos", {
            videos: result
        });
    });
});

//maths by class route
app.get("/maths-by-class", function(req, res){
    coursesModel.distinct("Topic", { "Class" : 7 }, function(err, result){
        // console.log(result)
        var preselectedTopic = result[0];
        res.render("mathsByClass", {
            topics: result,
            preselectedTopic: preselectedTopic
        });
    });
});

//maths by topic route
app.get("/maths-by-topic", function(req, res){
    coursesModel.distinct("Topic", function(err, result){
        // console.log(result)
        var preselectedTopic = result[0];
        res.render("mathsByTopic", {
            topics: result,
            preselectedTopic: preselectedTopic
        });
    });
});

//mental ability route
app.get("/mental-ability", function(req, res){
    mentalAbilityModel.distinct("Topic", function(err, result){
        // console.log(result);
        var preselectedTopic = result[0];
        res.render("mentalAbility", {
            topics: result,
            preselectedTopic: preselectedTopic
        });
    });
});


//Aryabhatta keys and solutions route
app.get("/keys-and-solutions", function(req, res){
    keysAndSolutionsModel.distinct("Year", { "Class" : 5 }, function(err, result){
        // console.log(result)
        var preselectedTopic = result[0];
        res.render("keysAndSolutions", {
            topics: result,
            preselectedTopic: preselectedTopic
        });
    });
});




//post mothod for ajax method in mental ability
app.post("/mentalAbility", async(req, res) => {
    // console.log(req.body)
    try{
        var topic = req.body.Topic;
        Result = await mentalAbilityModel.find({
            Topic: topic
        })
        .limit(500).lean().exec();

        return res.send(Result);
    }
    catch(err){
        return res.send(err);
    }
    
});


//post mothod for ajax method in maths by topic
app.post("/topic", async(req, res) => {
    // console.log(req.body)
    try{
        var topic = req.body.Topic;
        Result = await coursesModel.find({
            Topic: topic
        })
        .limit(500).lean().exec();

        return res.send(Result);
    }
    catch(err){
        return res.send(err);
    }
    
});

//post mothod for ajax method in maths by class
app.post("/courses", async(req, res) => {
    // console.log(req.body)
    try{
        var topic = req.body.Topic;
        var whichClass = req.body.Class;
        Result = await coursesModel.find({
            Topic: topic,
            Class: whichClass
        })
        .limit(500).lean().exec();

        return res.send(Result);
    }
    catch(err){
        return res.send(err);
    }
    
});


//post mothod for ajax method in maths by class
app.post("/classes", async(req, res) => {
    
    try{
        var whichClass = req.body.Class;
        Result = await coursesModel.distinct("Topic", {"Class": whichClass});   
        return res.send(Result);
    }
    catch(err){
        return res.send(err);
    }
    
});


//post mothod for ajax method in keys and solutions
app.post("/keys", async(req, res) => {
    
    try{
        var whichClass = req.body.Class;
        Result = await keysAndSolutionsModel.distinct("Year", {"Class": whichClass});   
        return res.send(Result);
    }
    catch(err){
        return res.send(err);
    }
    
});


//post mothod for ajax method in keys and solutions
app.post("/solutionVideos", async(req, res) => {
    // console.log(req.body)
    try{
        var topic = req.body.Topic;
        var whichClass = req.body.Class;
        Result = await keysAndSolutionsModel.find({
            Year: topic,
            Class: whichClass
        })
        .limit(500).lean().exec();

        return res.send(Result);
    }
    catch(err){
        return res.send(err);
    }
    
});


app.listen(3000, function(){
    console.log("server up and running");
});