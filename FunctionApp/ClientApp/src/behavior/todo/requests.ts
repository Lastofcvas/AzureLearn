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
    const URL = process.env.REACT_APP_API_URL! + TodoRoute.GetAll as string;
    return await apiRequest(URL, 'GET');
}

const addTodoApiRequest = async (todo: AddTodo): Promise<AddTodoResult> => {
    const URL = process.env.REACT_APP_API_URL! + TodoRoute.Add as string;
    return await apiRequest(URL, 'POST', todo);
}

const updateTodoApiRequest = async (todo: Todo): Promise<UpdateTodoResult> => {
    const URL = process.env.REACT_APP_API_URL! + TodoRoute.Update as string;
    return await apiRequest(URL, 'POST', todo);
}

const solveTodoApiRequest = async (id: string): Promise<SolveTodoResult> => {
    const URL = process.env.REACT_APP_API_URL! + TodoRoute.Solve as string;
    return await apiRequest(URL, 'POST', id);
}

const deleteTodoApiRequest = async (id: string): Promise<DeleteTodoResult> => {
    const URL = process.env.REACT_APP_API_URL! + TodoRoute.Delete as string;
    return await apiRequest(URL, 'POST', id);
}

export default {
    getAllTodosApiRequest,
    addTodoApiRequest,
    updateTodoApiRequest,
    solveTodoApiRequest,
    deleteTodoApiRequest
}