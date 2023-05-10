const Student = require("../db/models/student.js")
const bcrypt = require('bcrypt')

exports.createStudent = async (req, res) => {
    let student = new Student(req.body);
    const exist = await Student.findOne({ id: student.id })
    if (exist) {
        res.status(400).send("student with this ID already exist")
    } else {
        try {
            student.year = 1
            await student.save();
            res.status(200).send(student);
        } catch (err) {
            res.status(400).send("creating student failed");
        }
    }
}
exports.updateStudent = async (req, res) => {
    let student = new Student(req.body)
    let found = await Student.findOne({ id: student.id })
    if (found) {
        try {
            let result = await Student.updateOne(
                { id: student.id },
                {
                    $set: {
                        major: student.major,
                        first_name: student.first_name,
                        last_name: student.last_name
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
    }
}

exports.loginStudent = async (req, res) => {
    const id = req.body.id
    const password = req.body.password
    try {
        const student = await Student.authenticateAndGet(id, password)
        if (!student) {
            res.status(404).send()
        } else {
            const token = await student.genToken()
            student.save();
            res.status(200).send({ student, token })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "Login Error" });
    }
}
exports.getStudents = async (req, res) => {
    try {
        if (req.params.major) {
            res.status(200).send(await Student.find({ major: req.params.major }))
        } else {
            res.status(200).send(await Student.find({}))
        }
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.getStudentById = async (req, res) => {
    try {
        if (req.params.id) {
            res.status(200).send(await Student.find({ id: req.params.id }))
        } else {
            res.status(200).send(await Student.find({}))
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ id: req.params.id })
        if (student) {
            res.status(200).send()
        } else {
            res.status(404).send("student not found")
        }
    } catch (err) {
        res.status(400).send(err)
    }
}