const mongoose = require("mongoose");

const keysAndSolutionsSchema = mongoose.Schema({
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
    Year: {
        type: Number,
        required: true
    },
    Class: {
        type: Number,
        required: true
    }  
});

module.exports = mongoose.model("keysandsolution", keysAndSolutionsSchema);