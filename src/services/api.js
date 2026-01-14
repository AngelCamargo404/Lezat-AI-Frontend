import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const getTasks = () => api.get('/tasks');
export const createTask = (task) => api.post('/tasks', task);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const aiSummary = (tasks) => api.post('/ai/summary', { tasks });
export const aiSuggestPriority = (data) => api.post('/ai/suggest-priority', data);
export const aiAutoComplete = (data) => api.post('/ai/autocomplete', data);

export default api;
