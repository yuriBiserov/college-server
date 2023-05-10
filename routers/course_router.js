const express = require('express')
const router = express.Router()

const courseController = require("../controllers/course_controller.js")

//Courses Routes
router.post("/create-course",courseController.createOrUpdateCourse)
router.get("/get-courses/:major?",courseController.getCourses)
router.delete("/delete-course/:number",courseController.deleteCourse)


module.exports = router