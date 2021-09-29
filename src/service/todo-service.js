import axios from "axios";

async function getTodoList() {
    const response = await axios.get(`/api/tasks`);
    return response.data;
}
// eslint-disable-next-line no-unused-vars
async function getTodoItemById(id) {
    const response = await axios.get(`/api/tasks/${id}`);
    return response.data;
}
async function createTodoItem(details) {
    const response = await axios.post(`/api/tasks`,{details});
    return response.data;
}
async function updateTodoItemById(id, details, status) {
    const response = await axios.put(`/api/tasks/${id}`, {details, status});
    return response.data;
}
async function patchTodoItemById(id,data) {
    const response = await axios.patch(`/api/tasks/${id}`, data);
    return response.data;
}
async function deleteTodoItemById(id) {
    const response = await axios.delete(`/api/tasks/${id}`);
    return response.data;
}

export {getTodoList, createTodoItem, updateTodoItemById, patchTodoItemById, deleteTodoItemById};