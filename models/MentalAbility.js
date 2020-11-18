const mongoose = require("mongoose");

const mentalAbilitySchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model("mentalAbility", mentalAbilitySchema);