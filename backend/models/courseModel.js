const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    enroll_status : {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps : true })

module.exports = mongoose.model('Course', courseSchema)