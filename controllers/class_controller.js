const Class = require("../db/models/class");

exports.addClass = async (req, res) => {
    let classRoom = new Class(req.body);
    try {
        await classRoom.save();
        res.status(200).send(classRoom);
    } catch (err) {
        res.status(400).send("adding failed");
    }
}
exports.getClasses = async (req,res) => {
    try{
        res.status(200).send(await Class.find({}))
    }catch(err){
        res.status(400).send(err)
    }
}