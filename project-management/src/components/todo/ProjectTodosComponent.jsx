
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Alert, Table } from 'react-bootstrap';
import { useAuth } from './Security/AuthContext';
import {
    executeBasicAuthService,
    retrieveAllTodosForProjectApi,
    createTodoApi,
    deleteTodoApi,
    updateTodoApi,
    exportProjectSummaryApi
} from './api/TodoApiService ';

const ProjectTodosComponent = () => {
    const { projectId, username } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [showTodoModal, setShowTodoModal] = useState(false);
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await executeBasicAuthService(token);
                loadProjectTodos();
            } catch (err) {
                setError('Authentication failed: ' + err.message);
                console.error('Authentication error:', err);
            }
        };
        checkAuth();
    }, [token]);

    const loadProjectTodos = async () => {
        try {
            const response = await retrieveAllTodosForProjectApi(projectId);
            const activeTodos = response.data.filter(todo => !todo.done);
            const completed = response.data
                .filter(todo => todo.done)
                .map(todo => ({
                    ...todo,
                    completedDate: todo.updatedDate // Use updatedDate as completedDate
                }));
            setTodos(activeTodos);
            setCompletedTodos(completed);
        } catch (err) {
            setError('Error loading todos: ' + err.message);
            console.error('Error loading todos:', err);
        }
    };

    const handleSaveTodo = async () => {
        if (!newTodoDescription.trim()) return;

        const todoData = {
            description: newTodoDescription,
            done: editingTodo ? editingTodo.done : false,
            createdDate: new Date().toISOString(),
        };

        try {
            if (editingTodo) {
                await updateTodoApi(projectId, editingTodo.id, todoData);
                setTodos(todos.map(todo => (todo.id === editingTodo.id ? { ...todo, ...todoData } : todo)));
                setMessage("Todo updated successfully.");
            } else {
                const response = await createTodoApi(projectId, todoData);
                setTodos([...todos, response.data]);
                setMessage("Todo added successfully.");
            }

            setNewTodoDescription("");
            setShowTodoModal(false);
            setEditingTodo(null);
        } catch (error) {
            console.error("Error saving todo:", error);
            setError(editingTodo ? "Failed to update todo." : "Failed to add todo.");
        }
    };

    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
        setNewTodoDescription(todo.description);
        setShowTodoModal(true);
    };

    const handleMarkAsDone = async (todo) => {
        try {
            const updatedTodo = { ...todo, done: true };
            await updateTodoApi(projectId, todo.id, updatedTodo);
            setTodos(todos.filter(t => t.id !== todo.id));
            setCompletedTodos([...completedTodos, { ...updatedTodo, completedDate: new Date().toISOString() }]);
            setMessage("Todo marked as completed.");
        } catch (error) {
            console.error("Error marking todo as done:", error);
            setError("Failed to mark todo as completed.");
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            await deleteTodoApi(projectId, todoId);
            setTodos(todos.filter(todo => todo.id !== todoId));
            setMessage("Todo deleted successfully.");
        } catch (error) {
            console.error("Error deleting todo:", error);
            setError("Failed to delete todo.");
        }
    };


    const exportProjectSummary = async (username, projectId) => {
        try {
            const response = await exportProjectSummaryApi(username, projectId);

            if (response.status !== 200) {
                console.error('Failed to fetch project summary:', response.statusText);
                throw new Error('Failed to fetch project summary: ' + response.statusText);
            }


            const blob = new Blob([response.data], { type: 'text/markdown' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${projectId}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            setMessage('Project summary exported successfully.');
        } catch (error) {
            console.error('Error exporting project summary:', error);
            setError('Failed to export project summary.');
        }
    };
    return (
        <div className="container mt-5">
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="info" onClick={() => exportProjectSummary(username, projectId)}>
                Export Project Summary
            </Button>

            <h3>Active Todos</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.createdDate ? new Date(todo.createdDate).toLocaleDateString() : "N/A"}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditTodo(todo)}>Edit</Button>{' '}
                                <Button variant="success" onClick={() => handleMarkAsDone(todo)}>Done</Button>{' '}
                                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h3>Completed Todos</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Completed Date</th>
                    </tr>
                </thead>
                <tbody>
                    {completedTodos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.createdDate ? new Date(todo.createdDate).toLocaleDateString() : "N/A"}</td>
                            <td>{todo.completedDate ? new Date(todo.completedDate).toLocaleDateString() : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button variant="success" onClick={() => { setShowTodoModal(true); setEditingTodo(null); }}>Add Todo</Button>

            <Modal show={showTodoModal} onHide={() => setShowTodoModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingTodo ? "Edit Todo" : "Add Todo"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTodoDescription}
                                onChange={(e) => setNewTodoDescription(e.target.value)}
                                placeholder="Enter todo description"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTodoModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveTodo}>
                        {editingTodo ? "Save Changes" : "Add Todo"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProjectTodosComponent;
