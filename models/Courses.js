const mongoose = require("mongoose");

const coursesSchema = mongoose.Schema({
    ImageSource: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    VideoLink: {
        type: String,
        required: true
    },
    Topic: {
        type: String,
        required: true
    },
    Class: {
        type: [Number],
        required: true
    }  
});

module.exports = mongoose.model("course", coursesSchema);