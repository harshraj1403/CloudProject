import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CourseDetails = ({ course }) => {
    const { dispatch } = useCoursesContext()
    const { user } = useAuthContext()

    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(course.title)
    const [newDetails, setNewDetails] = useState(course.details)
    const [newSemester, setNewSemester] = useState(course.semester)
    const [newEnroll_status, setNewEnroll_status] = useState(course.enroll_status)

    const handleDelete = async () => {
        if (!user) return

        const response = await fetch('/api/courses/' + course._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_COURSE', payload: json })
        }
    }

    const handleUpdate = async () => {
        if (!user) return

        const updatedData = {
            ...course,
            title: newTitle,
            details: newDetails,
            semester: newSemester,
            enroll_status: newEnroll_status
        }

        const response = await fetch('/api/courses/' + course._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedData)
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_COURSE', payload: json })
            setIsEditing(false) 
            window.location.reload() 
        }
    }

    return (
        <div className="course-details">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Course Title"
                    />
                    <p>
                        <strong>Details: </strong>
                        <input
                            type="text"
                            value={newDetails}
                            onChange={(e) => setNewDetails(e.target.value)}
                        />
                    </p>
                    <p>
                        <strong>Semester: </strong>
                        <input
                            type="number"
                            value={newSemester}
                            onChange={(e) => setNewSemester(e.target.value)}
                        />
                    </p>
                    <p>
                        <strong>Enroll status: </strong>
                        <input
                            type="text"
                            value={newEnroll_status}
                            onChange={(e) => setNewEnroll_status(e.target.value)}
                        />
                    </p>
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <h4>{course.title}</h4>
                    <p><strong>Details: </strong>{course.details}</p>
                    <p><strong>Semester: </strong>{course.semester}</p>
                    <p><strong>Enroll status: </strong>{course.enroll_status}</p>
                </>
            )}

            <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>

           
            <div className="icon-container">
                <span className="material-symbols-outlined delete-icon" onClick={handleDelete}>delete</span>
                <span className="material-symbols-outlined edit-icon" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'cancel' : 'edit'}
                </span>
            </div>
        </div>
    )
}

export default CourseDetails
