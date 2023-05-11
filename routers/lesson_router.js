const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth.js")
const lessonRouter = require("../controllers/lesson_controller.js")

router.post("/create-lesson" ,lessonRouter.createLesson)
router.get("/get-lessons/:id?", lessonRouter.getStudentLessons)
router.get("/get-lessons/lecturer/:id?", lessonRouter.getLecturerLessons)
router.post("/attendance", lessonRouter.sendAttendance)
router.get("/attendance/:studentId&:lessonId", lessonRouter.getAttendance)



module.exports = router