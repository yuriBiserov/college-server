const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth.js")
const lessonRouter = require("../controllers/lesson_controller.js")

router.post("/create-lesson", auth.Lecturer ,lessonRouter.createLesson)
router.get("/get-lessons/:id?", lessonRouter.getLessons)
router.post("/attendance", lessonRouter.sendAttendance)
router.get("/attendance/:studentId&:lessonId", lessonRouter.getAttendance)



module.exports = router