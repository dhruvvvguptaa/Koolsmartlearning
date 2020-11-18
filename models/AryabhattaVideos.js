const mongoose = require("mongoose");

const aryabhattaVideoSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model("AryabhattaVideo", aryabhattaVideoSchema);
