const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheludeSchema = new Schema({
    days: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Day'
        }
    ],
})


const Schelude = mongoose.model('schelude', scheludeSchema)

module.exports = Schelude