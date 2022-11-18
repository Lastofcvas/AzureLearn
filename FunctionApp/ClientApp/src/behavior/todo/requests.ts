import apiRequest from "../../api/apiRequest";
import { TodoRoute } from "./routes";
import { AddTodo, Todo } from "./types";

export type GetAllTodosResult = {
    todos: Todo[]
}

export type AddTodoResult = {
    todo: Todo
}

export type UpdateTodoResult = AddTodoResult;

export type DeleteTodoResult = {
    id: string
}

export type SolveTodoResult = DeleteTodoResult;

const getAllTodosApiRequest = async (): Promise<GetAllTodosResult> => {
    const URL: string = process.env.REACT_APP_API_URL! + TodoRoute.GetAll;
    return await apiRequest(URL, 'GET');
}

const addTodoApiRequest = async (todo: AddTodo): Promise<AddTodoResult> => {
    const URL: string = process.env.REACT_APP_API_URL! + TodoRoute.Add;
    return await apiRequest(URL, 'POST', todo);
}

const updateTodoApiRequest = async (todo: Todo): Promise<UpdateTodoResult> => {
    const URL: string = process.env.REACT_APP_API_URL! + TodoRoute.Update;
    return await apiRequest(URL, 'POST', todo);
}

const solveTodoApiRequest = async (id: string): Promise<SolveTodoResult> => {
    const URL: string = process.env.REACT_APP_API_URL! + TodoRoute.Solve;
    return await apiRequest(URL, 'POST', id);
}

const deleteTodoApiRequest = async (id: string): Promise<DeleteTodoResult> => {
    const URL: string = process.env.REACT_APP_API_URL! + TodoRoute.Delete;
    return await apiRequest(URL, 'POST', id);
}

const todoApi = {
    getAllTodosApiRequest,
    addTodoApiRequest,
    updateTodoApiRequest,
    solveTodoApiRequest,
    deleteTodoApiRequest
}

export default todoApi;