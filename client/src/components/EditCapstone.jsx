import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { backend_Uri } from '../config/constants'
import './EditCap.Module.css'

const EditCapstone = () => {
    const { id } = useParams()
    const [projectName, setProjectName] = useState()
    const [projectDescription, setProjectDescription] = useState()
    const [deployedLink, setDeployedLink] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`${backend_Uri}/api/v1/media/getMedia/${id}`)
            .then(result => {
                console.log(result)
                setProjectName(result.data.projectName)
                setProjectDescription(result.data.projectDescription)
                setDeployedLink(result.data.deployedLink)
            })
            .catch(error => console.log(error))
    }, [])

    const update = (e) => {
        e.preventDefault()
        axios.put(`${backend_Uri}/api/v1/media/updateMedia/${id}`, { projectName, projectDescription, deployedLink })
            .then(res => {
                console.log("Data Changed", res.message, res)
                navigate('/displayMedias')
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="form-container">
            <h2>Update Project</h2>
            <form className="update-form" onSubmit={update}>
                <label htmlFor="projectName">Project Name:</label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="form-control"
                />
                <label htmlFor="projectDescription">Project Description:</label>
                <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="form-control"
                ></textarea>
                <label htmlFor="deployedLink">Deployed Link:</label>
                <input
                    type="text"
                    id="deployedLink"
                    value={deployedLink}
                    onChange={(e) => setDeployedLink(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditCapstone
