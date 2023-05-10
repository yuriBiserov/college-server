const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth.js")
const studentController = require("../controllers/student_controller.js")

//STUDENT
router.post("/register" ,studentController.createStudent)
router.post("/update" ,studentController.updateStudent)
router.post("/login" , studentController.loginStudent)
router.get("/get-students/:major?" , studentController.getStudents)
router.get("/get-student/:id" , studentController.getStudentById)
router.delete("/delete-student/:id" , studentController.deleteStudent)



module.exports = router