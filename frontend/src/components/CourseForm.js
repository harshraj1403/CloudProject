import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './course.css'
 import './design.css'

const CourseForm = () => {

    const {dispatch} = useCoursesContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [semester, setSemester] = useState('')
    const [enroll_status, setEnroll_status] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return 
        }

        const course = {title, details, semester, enroll_status}

        const response = await fetch('/api/courses', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        else{
            setTitle('')
            setDetails('')
            setSemester('')
            setEnroll_status('')
            setError(null)
            setEmptyFields([])
            console.log('new course added', json)
            dispatch({type : 'CREATE_COURSE', payload : json})
        }
            
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Course</h3>

            <label>Course Title: </label>
            <input
                type = "text"
                onChange = {(e) => {setTitle(e.target.value)}}
                value = {title}
                className = {emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Details: </label>
            <input
                type = "text"
                onChange = {(e) => {setDetails(e.target.value)}}
                value = {details}
                className = {emptyFields.includes('details') ? 'error' : ''}
            /> 

            <label>Semester: </label>
            <input
                type = "number"
                onChange = {(e) => {setSemester(e.target.value)}}
                value = {semester}
                className = {emptyFields.includes('semester') ? 'error' : ''}
            />

            <label>Enroll status: </label>
            <input
                type = "text"
                onChange = {(e) => {setEnroll_status(e.target.value)}}
                value = {enroll_status}
                className = {emptyFields.includes('enroll_status') ? 'error' : ''}
            />   

            <button>Add Course</button>  
            {error && <div className="error">{error}</div>}       
        </form>
    )
}

export default CourseForm