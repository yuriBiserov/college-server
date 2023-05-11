const mongoose = require('mongoose')
const Student = require('./student')
const Lecturer = require('./lecturer')
const Course = require('./course')
const Schema = mongoose.Schema


const lessonSchema = new Schema({
    major: {
        type: String,
        required: true,
        trim: true,
    },
    class: {
        type: String,
    },
    course: {
        type: Schema.Types.Mixed,
    },
    students: [
        {
            type: Schema.Types.Mixed,
        }
    ],
    lecturer: {
        type: Schema.Types.Mixed,
        required: true,
    },
    in_class: {
        type: Boolean,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    latitude: {
        type: String,
        default: null
    },
    longitude: {
        type: String,
        default: null
    },
    
    attendance: [
        {
            type: String,
        }
    ]
})


const Lesson = mongoose.model('lessons', lessonSchema)

module.exports = Lesson