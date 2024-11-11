const express = require("express");
const router = express.Router();
const {validayionSchema} = require('../middelware/validation');
const coursesContrloler = require('../controlers/courses._controler');


router.route('/')
    .get(coursesContrloler.get_all_courses)
    .post(validayionSchema(),
    coursesContrloler.add_course);


router.route('/:courseId')
                .get(coursesContrloler.get_course)
                .patch(coursesContrloler.update_course)
                .delete(coursesContrloler.delete_course);

module.exports = router;
