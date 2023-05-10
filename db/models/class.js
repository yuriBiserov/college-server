const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const classSchema = new Schema({
    number: {
        type: String,
    }
})


const Class = mongoose.model('classes', classSchema)

module.exports = Class