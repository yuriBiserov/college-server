const mongoose = require('mongoose')
const Lesson = require('./lesson')
const Schema = mongoose.Schema

const daySchema = new Schema({
    name:{
        type:String,
        enum:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
    },
    lessons: [
        {
            type: Schema.Types.Mixed,
        }
    ],
})


const Day = mongoose.model('day', daySchema)

module.exports = Day