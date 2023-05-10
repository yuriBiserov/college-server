const jwt = require('jsonwebtoken');
const Lecturer = require('../db/models/lecturer');
const Student = require('../db/models/student');

exports.Student = async (req, res, next) => {
    try {
        const token = req.header('Auth').replace('Bearer ', '')

        const decoded = jwt.verify(token, "mysecretword");

        const student = await Student.findOne(
            {
                id: decoded.id,
                'tokens.token': token
            })

        if (!student) {
            throw new Error("No student found or user is not logged out");
        }
        req.student = student
        req.token = token
        next();
    } catch (err) {
        console.log(err)
        res.status(401).send("Authorization error")
    }
}

exports.Lecturer = async (req, res, next) => {
    try {
        const token = req.header('Auth').replace('Bearer ', '')
        const decoded = jwt.verify(token, "mysecretword");
        const lecturer = await Lecturer.findOne(
            {
                id: decoded.id,
                'tokens.token': token
            })

        if (!lecturer) {
            throw new Error("No lecturer found or user is not logged out");
        }
        req.lecturer = lecturer
        req.token = token
        next();
    } catch (err) {
        console.log(err)
        res.status(401).send("Authorization error")
    }
}