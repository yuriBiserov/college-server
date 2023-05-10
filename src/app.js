const express = require('express')
const path = require('path')
require(path.join(__dirname, '../db/mongoose/connect.js'));
const StudentRouter = require('../routers/student_router.js')
const LecturerRouter = require('../routers/lecturer_router.js')
const CourseRouter = require('../routers/course_router.js')
const LessonRouter = require('../routers/lesson_router.js')
const ClassRouter = require('../routers/class_router.js')

const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/student', StudentRouter);
app.use('/lecturer', LecturerRouter);
app.use('/courses', CourseRouter);
app.use('/lessons', LessonRouter)
app.use('/classes', ClassRouter)


const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`Listening at port: http://localhost:${port}`);
})


