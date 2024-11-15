const express = require('express')
const {addCourse, getAllCourses, getSingleCourse, deleteCourse, updateCourse} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

router.use(requireAuth)

router.get('/', getAllCourses)


router.get('/:id', getSingleCourse)


router.post('/', addCourse)


router.delete('/:id', deleteCourse)


router.patch('/:id', updateCourse)

module.exports = router
