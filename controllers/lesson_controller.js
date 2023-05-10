const bcrypt = require('bcrypt');
const Lesson = require('../db/models/lesson');

exports.createLesson = async (req, res) => {
    let lesson = new Lesson(req.body);
    try {
        await lesson.save();
        res.status(200).send(lesson);
    } catch (err) {
        res.status(400).send(err);
    }
}
exports.getLessons = async (req, res) => {
    if (req.params.id) {
        try {
            const lessons = await Lesson.find(
                { students: { $elemMatch: { id: req.params.id } } }
            )
            res.status(200).send(lessons);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        try {
            const lessons = await Lesson.find({})
            res.status(200).send(lessons);
        } catch (err) {
            res.status(400).send(err);
        }
    }
}
exports.sendAttendance = async (req, res) => {
    try {
        const id = req.body.id
        let lesson = await Lesson.updateOne(
            { _id: req.body.lesson._id },
            { $push: { attendance: id } }
        )
        res.status(200).send(lesson)
    } catch (err) {

    }
}
exports.getAttendance = async (req, res) => {
    try {
        const studentId = req.params.studentId
        const lessonId = req.params.lessonId
        let lesson = await Lesson.find(
            { _id: lessonId }
        )
        res.status(200).send( lesson[0].attendance.some((a => a == studentId)) )
    } catch (err) {

    }
}

