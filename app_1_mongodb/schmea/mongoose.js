
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const Course = mongoose.model("Course", userSchema);
module.exports = Course;


