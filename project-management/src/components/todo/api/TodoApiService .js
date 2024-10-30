
import { apiClient } from "./ApiClient";

export const executeBasicAuthService = (token) =>
    apiClient.get(`/basicauth`, {
        headers: {
            Authorization: token,
        },
    });

export const retrieveAllTodosForProjectApi = (projectId) =>
    apiClient.get(`/projects/${projectId}/todos`);

export const createTodoApi = (projectId, todo) =>
    apiClient.post(`/projects/${projectId}/todos`, todo);

export const updateTodoApi = (projectId, id, todo) =>
    apiClient.put(`/projects/${projectId}/todos/${id}`, todo);

export const deleteTodoApi = (projectId, id) =>
    apiClient.delete(`/projects/${projectId}/todos/${id}`);

export const retrieveTodoApi = (projectId, id) =>
    apiClient.get(`/projects/${projectId}/todos/${id}`);

export const retrieveCompletedTodosForProjectApi = (projectId) =>
    apiClient.get(`/projects/${projectId}/todos/completed`);

export const retrievePendingTodosForProjectApi = (projectId) =>
    apiClient.get(`/projects/${projectId}/todos/pending`);

export const retrieveAllProjectsForUsernameApi = (username) =>
    apiClient.get(`/users/${username}/projects`);

export const createProjectApi = (username, project) =>
    apiClient.post(`/users/${username}/projects`, project);

export const retrieveProjectDetailsApi = (username, projectId) =>
    apiClient.get(`/users/${username}/projects/${projectId}`);

export const exportProjectSummaryApi = (username, projectId) =>
    apiClient.get(`/users/${username}/projects/${projectId}/export`);

