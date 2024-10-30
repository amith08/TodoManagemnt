
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Alert, Form, InputGroup } from 'react-bootstrap';
import { retrieveAllProjectsForUsernameApi, createProjectApi } from './api/TodoApiService ';

function WelcomeComponent() {
    const { username } = useParams();
    const [message, setMessage] = useState(null);
    const [projects, setProjects] = useState([]);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const response = await retrieveAllProjectsForUsernameApi(username);
            setProjects(response.data);
        } catch (error) {
            console.error("Error loading projects:", error);
            setMessage("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewProject = (projectId) => {
        navigate(`/projects/${projectId}/todos`);
    };

    const handleAddProject = async () => {
        if (!newProjectTitle.trim()) {
            setMessage("Please enter a project title");
            return;
        }

        const newProject = { title: newProjectTitle };

        try {
            await createProjectApi(username, newProject);
            setNewProjectTitle('');  // Clear the input field
            loadProjects();  // Refresh the project list
            setMessage("Project added successfully!");
        } catch (error) {
            console.error("Error adding project:", error);
            setMessage("Failed to add project. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                     <div className="text-center p-5 bg-light rounded shadow">
                        <h1 className="display-4">Welcome, {username}!</h1>
                        <p className="lead"/>
                            Manage your projects and tasks efficiently.
                        
                    </div> 

                    {/* Project Addition Form */}
                    <div className="mt-4">
                        <h3>Add a New Project</h3>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter project title"
                                value={newProjectTitle}
                                onChange={(e) => setNewProjectTitle(e.target.value)}
                            />
                            <Button variant="success" onClick={handleAddProject}>Add Project</Button>
                        </InputGroup>
                    </div>

                    
                    {message && (
                        <Alert variant={message.includes("failed") ? "danger" : "success"} className="mt-4 text-center">
                            {message}
                        </Alert>
                    )}

                   
                    {loading ? <p>Loading projects...</p> : (
                        projects.length > 0 && (
                            <div className="mt-4">
                                <h2>Your Projects</h2>
                                <ul className="list-group">
                                    {projects.map(project => (
                                        <li key={project.id} className="list-group-item">
                                            <h5>{project.title}</h5>
                                            <p>Created on: {new Date(project.createdDate).toLocaleDateString()}</p>
                                            <Link to={`/users/${username}/projects/${project.id}/todos`} className="btn btn-info btn-sm">
                                                View Project
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default WelcomeComponent;
