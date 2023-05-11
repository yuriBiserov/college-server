const bcrypt = require('bcrypt');
const Lesson = require('../db/models/lesson');

exports.createLesson = async (req, res) => {
    let lesson = new Lesson(req.body);
    let exist = await Lesson.findOne({ _id:lesson._id })
    if (exist) {
        try {
            let result = await Lesson.updateOne(
                { _id: lesson._id },
                {
                    $set: {
                        class: lesson.class,
                        lecturer: lesson.lecturer,
                        in_class: lesson.in_class,
                        start_time:lesson.start_time,
                        end_time:lesson.end_time,
                        date:lesson.date,
                        latitude:lesson.latitude,
                        longitude:lesson.longitude,
                        attendance:lesson.attendance
                    }
                },
                { upsert: true }
            )
            if (result) {
                res.status(200).send(result)
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }else{
        try {
            await lesson.save();
            res.status(200).send(lesson);
        } catch (err) {
            res.status(400).send(err);
        }
    }    
}
exports.getStudentLessons = async (req, res) => {
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
exports.getLecturerLessons = async (req, res) => {
    if (req.params.id) {
        try {
            const lessons = await Lesson.find(
                { 'lecturer.id':  req.params.id } 
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

