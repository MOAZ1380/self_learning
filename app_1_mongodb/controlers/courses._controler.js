let {courses} = require('../data/courses');
const Course = require('../schmea/mongoose')

const {validationResult} = require('express-validator')


const get_all_courses = async(req, res) => {
    try{
        let course_all = await Course.find();
        res.json(course_all);
    } catch (error) {
        res.json({ error: "Failed to retrieve courses", details: error.message });
    }
    
}

const get_course = async(req, res) => {
    try{
        let get_courst = await Course.find({_id : req.params.courseId});
        if(!get_courst){
            return res.json({id : "not found"});
        }
        res.json(get_courst);
    } catch (error) {
        res.json({ error: "Failed to retrieve courses", details: error.message });
    }
    
}

const add_course = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const course = new Course(req.body);
    try {
        await course.save();
        res.json({ message: "Course added successfully", course });
    } catch (error) {
        res.json({ error: "Failed to add course", details: error.message });
    }
}

const update_course = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true, runValidators: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(updatedCourse);
    } catch (error) {
        res.json({ message: "Failed to update course", error: error.message });
    }
};

const delete_course = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully", deletedCourse });
    } catch (error) {
        res.json({ message: "Failed to delete course", error: error.message });
    }
};


module.exports = {
    get_all_courses,
    get_course,
    add_course,
    update_course,
    delete_course
}

