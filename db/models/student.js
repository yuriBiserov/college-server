const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Course = require('./course')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const coursesEnum = require("./coursesEnum")


const studentSchema = new Schema({
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
    major: {
        type: String,
        required: true,
        trim: true,
        enum:coursesEnum
    },
    year:{
        type:Number
    },
    courses: [
        {
            type: Schema.Types.Mixed
            // ref: 'Course'
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

studentSchema.pre('save', async function (next) {
    const student = this;
    try {
        if (student.isModified('password')) {
            const hashedPassword = await bcrypt.hash(student.password, 8)
            student.password = hashedPassword;
            next()
        }
    } catch (err) {
        console.log(err)
    }
})

studentSchema.statics.authenticateAndGet = async (id, password) => {
    const student = await Student.findOne({ id: id })
    if (!student) {
        throw new Error("No student with id:  " + id)
    }
    const isSame = await bcrypt.compare(password, student.password)
    if (!isSame) {
        throw new Error("Wrong Password")
    } else {
        return student
    }
}
studentSchema.methods.genToken = async function () {
    const student = this
    const token = jwt.sign(
        { id: student.id.toString() },
        "mysecretword",
        { expiresIn: "1 hour" });

    student.tokens.push({ token })
    return token
}

const Student = mongoose.model('students', studentSchema)

module.exports = Student