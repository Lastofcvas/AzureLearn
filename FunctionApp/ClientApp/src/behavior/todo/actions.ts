import { Todo, AddTodo } from "./types";

export const TODO_GETALL = 'TODO/GETALL' as const;
export const getAllTodos = () => ({type: TODO_GETALL});

export const TODO_GET = 'TODO/GET' as const;
export const getTodo = (todoId: string) => ({type: TODO_GET, payload: todoId});

export const TODO_ADD = 'TODO/ADD' as const;
export const addTodo = (todo: AddTodo) => ({type: TODO_ADD, payload: todo});

export const TODO_UPDATE = 'TODO/UPDATE' as const;
export const updateTodo = (todo: Todo) => ({type: TODO_UPDATE, payload: todo});

export const TODO_SOLVE = 'TODO/SOLVE' as const;
export const solveTodo = (todoId: string) => ({type: TODO_SOLVE, payload: todoId});

export const TODO_DELETE = 'TODO/DELETE' as const;
export const deleteTodo = (todoId: string) => ({type: TODO_DELETE, payload: todoId});

export const TODO_LOADED = 'TODO/LOADED' as const;
export const todoLoaded = (todos: Todo[]) => ({type: TODO_LOADED, payload: todos});

export const TODO_ADDED = 'TODO/ADDED' as const;
export const todoAdded = (todo: Todo) => ({type: TODO_ADDED, payload: todo});

export const TODO_UPDATED = 'TODO/UPDATED' as const;
export const todoUpdated = (todo: Todo) => ({type: TODO_UPDATED, payload: todo});

export const TODO_SOLVED = 'TODO/SOLVED' as const;
export const todoSolved = (todoId: string) => ({type: TODO_SOLVED, payload: todoId});

export const TODO_DELETED = 'TODO/DELETED' as const;
export const todoDeleted = (todoId: string) => ({type: TODO_DELETED, payload: todoId});

export type TodoAction = ReturnType<
    | typeof addTodo 
    | typeof getAllTodos
    | typeof getTodo
    | typeof addTodo
    | typeof updateTodo
    | typeof solveTodo
    | typeof deleteTodo
>;

export type TodoDocumentAction = ReturnType<
    | typeof todoLoaded
    | typeof todoAdded
    | typeof todoUpdated
    | typeof todoSolved
    | typeof todoDeleted
>;