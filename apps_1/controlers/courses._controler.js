let {courses} = require('../data/courses');

const {validationResult} = require('express-validator')


const get_all_courses =  (req, res) => {
    res.json(courses);
}

const get_course = (req, res) => {
    const courseId = +req.params.courseId;
    const course = courses.find((course) => courseId === course.id);
    res.json(course);
}

const add_course = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const my_post = req.body;
    courses.push({id : courses.length+1,  ...my_post});
    res.json(courses);
}

const update_course = (req, res) => {
    const my_patch = +req.params.courseId;
    let course = courses.find((course) => course.id ===  my_patch);
    course = {...course, ...req.body};
    res.json(course);
}

const delete_course = (req, res) => {
    let my_del = +req.params.courseId;
    courses = courses.filter((course) => course.id !== my_del);
    res.json(courses);
}

module.exports = {
    get_all_courses,
    get_course,
    add_course,
    update_course,
    delete_course
}

