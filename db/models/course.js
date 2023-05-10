const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const coursesEnum = require("./coursesEnum")


const courseSchema = new Schema({
    number: {
        type: Number,
    },
    major: {
        type: String,
        required: true,
        trim: true,
        enum:coursesEnum
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    duration_in_minutes: {
        type: Number,
        trim: true,
        required: true,
        min:60
    },
})


const Course = mongoose.model('courses', courseSchema)

module.exports = Course