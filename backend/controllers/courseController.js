const Course = require('../models/courseModel')
const mongoose = require('mongoose')

const getAllCourses = async (req, res) => {
    const user_id = req.user._id
    const all_Courses = await Course.find({ user_id }).sort({createdAt: -1});
    res.status(200).json(all_Courses)
}

const getSingleCourse = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error : "No such Course"})

    const single_Course = await Course.findById(id);
    
    if(!single_Course)
        return res.status(404).json({error : "No such Course"})

    res.status(200).json(single_Course)
}

const addCourse = async (req, res) => {
    const {title, details, semester, enroll_status} = req.body

    let emptyFields = []

    if(!title)
        emptyFields.push('title')

    if(!details)
        emptyFields.push('details')

    if(!semester)
        emptyFields.push('semester')

    if(!enroll_status)
        emptyFields.push('enroll_status')

    if(emptyFields.length > 0)
        return res.status(400).json({error : 'Please fill in all the fields', emptyFields})

    try{
        const user_id = req.user._id
        const course = await Course.create({title, details, semester, enroll_status, user_id})
        res.status(200).json(course)
    }

    catch(error){
        res.status(400).json({error : error.message})
    }
}

const updateCourse = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error : "No such Course"})

    const course = await Course.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!course)
        return res.status(404).json({error : "No such Course"})

    return res.status(200).json(course)
}

const deleteCourse = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such Course"})
    }

    const course = await Course.findOneAndDelete({_id: id})
    
    if(!course)
        return res.status(404).json({error : "No such Course"})

    return res.status(200).json(course)
}

module.exports = {
    addCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse
}