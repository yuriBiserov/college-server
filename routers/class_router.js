const express = require('express')
const router = express.Router()

const classRouter = require("../controllers/class_controller.js")

router.post("/add-class",classRouter.addClass)
router.get("/get-classes",classRouter.getClasses)



module.exports = router