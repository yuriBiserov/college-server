const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const coursesEnum = require('./coursesEnum')

const lecturerSchema = new Schema({
    id: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    first_name: {
        type: String,
        trim: true,
        required: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
    },
    isAdmin:{
        type:Boolean
    },
    courses: [
        {
            type: Schema.Types.Mixed,
        }
    ],
    major:[
        {
            type:String,
            enum:coursesEnum
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

lecturerSchema.pre('save', async function (next) {
    const lecturer = this;
    try {
        if (lecturer.isModified('password')) {
            const hashedPassword = await bcrypt.hash(lecturer.password, 8)
            lecturer.password = hashedPassword;
            next()
        }
    } catch (err) {
        console.log(err)
    }
})
lecturerSchema.statics.authenticateAndGet = async (id, password) => {
    const lecturer = await Lecturer.findOne({ id: id })
    if (!lecturer) {
        throw new Error("No lecturer with id:  " + id)
    }
    const isSame = await bcrypt.compare(password, lecturer.password)
    if (!isSame) {
        throw new Error("Wrong Password")
    } else {
        return lecturer
    }
}
lecturerSchema.methods.genToken = async function () {
    const lecturer = this
    if(lecturer.isAdmin){
        const token = jwt.sign(
            { id: lecturer.id.toString() },
            "mysecretword",
            { expiresIn: "6 hours" });
        lecturer.tokens.push({ token })
        return token
    }
}

const Lecturer = mongoose.model('lecturers', lecturerSchema)

module.exports = Lecturer