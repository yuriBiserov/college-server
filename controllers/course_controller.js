const Course = require("../db/models/course.js")
const bcrypt = require('bcrypt')

exports.createOrUpdateCourse = async (req, res) => {
    let course = new Course(req.body)
    let found = await Course.findOne({ number: course.number })
    if (found) {
        //edit
        try {
            let result = await Course.updateOne(
                { number: course.number },
                {
                    $set: {
                        major: course.major,
                        name: course.name,
                        duration_in_minutes: course.duration_in_minutes
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
    } else {
        //create
        try {
            const last = await Course.find({}).limit(1).sort({ $natural: -1 })
            if (last.length) {
                course.number = last[0].number + 1
            }
            else {
                course.number = 1
            }
            await course.save();
            res.status(200).send(course);
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

exports.getCourses = async (req, res) => {
    try {
        if (req.params.major) {
            res.status(200).send(await Course.find({ major: req.params.major }))
        } else {
            res.status(200).send(await Course.find({}))
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ number: req.params.number })
        if (course) {
            res.status(200).send()
        } else {
            res.status(404).send("course not found")
        }
    } catch (err) {
        res.status(400).send(err)
    }
}