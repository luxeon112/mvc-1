const CourseModel = require("../models/CourseModel");

async function index(req, res) {
    res.render('courses/index', {courses: await CourseModel.getAll({}, req.db)})
}

module.exports = {
    index
}
