const Lecturer = require("../db/models/lecturer.js")
const bcrypt = require('bcrypt')

exports.createLecturer = async (req, res) => {
    let lecturer = new Lecturer(req.body);
    const exist = await Lecturer.findOne({ id: lecturer.id })
    if (exist) {
        res.status(400).send("lecturer with this ID already exist")
    } else {
        try {
            await lecturer.save();
            res.status(200).send(lecturer);
        } catch (err) {
            res.status(400).send("creating lecturer failed");
        }
    }
}

exports.loginLecturer = async (req, res) => {
    const id = req.body.id
    const password = req.body.password
    
    try{
        const lecturer = await Lecturer.authenticateAndGet(id , password)
        if(!lecturer){
            res.status(404).send()
        }else{
            const token = await lecturer.genToken()
            lecturer.save();
            res.status(200).send({lecturer , token})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({ message: "Login Error" });
    }

}
exports.getLecturers = async (req, res) => {
    try{
        if (req.params.major) {
            res.status(200).send(await Lecturer.find({major: req.params.major}))
        } else {
            res.status(200).send(await Lecturer.find({}))
        }    }catch(err){
        res.status(400).send(err)
    }
}
exports.updateLecturer = async (req, res) => {
    let lecturer = new Lecturer(req.body)
    let found = await Lecturer.findOne({ id:lecturer.id })
    if (found) {
        try {
            let result = await Lecturer.updateOne(
                { id: lecturer.id },
                {
                    $set: {
                        major: lecturer.major,
                        first_name: lecturer.first_name,
                        last_name: lecturer.last_name,
                        isAdmin:lecturer.isAdmin
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
exports.deleteLecturer = async (req,res) => {
    try{
        const lecturer = await Lecturer.findOneAndDelete({id:req.params.id})
        if(lecturer){
            res.status(200).send()
        }else{
            res.status(404).send("lecturer not found")
        }
    }catch(err){
        res.status(400).send(err)
    }
}

