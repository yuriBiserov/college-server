const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth.js")
const lecturerController = require("../controllers/lecturer_controller.js")

router.post("/register",lecturerController.createLecturer)
router.post("/update",lecturerController.updateLecturer)
router.post("/login",lecturerController.loginLecturer)
router.get('/get-lecturers/:major?',auth.Lecturer,lecturerController.getLecturers)
router.delete('/delete-lecturer/:id',auth.Lecturer,lecturerController.deleteLecturer)




module.exports = router