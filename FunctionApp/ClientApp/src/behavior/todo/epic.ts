import { 
    TodoCommandAction, 
    todoAdded, 
    todoLoaded, 
    todoUpdated, 
    TODO_ADD, 
    TODO_GETALL, 
    TODO_SOLVE, 
    TODO_UPDATE, 
    todoSolved, 
    TODO_DELETE,
    todoDeleted
} from "./actions";
import { Epic } from "../../store/types";
import { combineEpics, ofType } from "redux-observable";
import { mergeMap, switchMap, of, from } from "rxjs";
import { ObservableInput } from "rxjs";
import { AddTodoResult, DeleteTodoResult, GetAllTodosResult, SolveTodoResult, UpdateTodoResult } from "./requests";

const getAllTodosEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_GETALL),
        switchMap(action => from(api.getAllTodosApiRequest() as ObservableInput<GetAllTodosResult>).pipe(
            mergeMap(response => {
                return of(todoLoaded(response.todos))
            })
        ))
    )
}

const addTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_ADD),
        switchMap(action => from(api.addTodoApiRequest(action.payload) as ObservableInput<AddTodoResult>).pipe(
            mergeMap(response => {
                return of(todoAdded(response.todo));
            }))
        )
    );
}

const updateTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_UPDATE),
        switchMap(action => from(api.updateTodoApiRequest(action.payload) as ObservableInput<UpdateTodoResult>).pipe(
            mergeMap(response => {
                return of(todoUpdated(response.todo));
            }))
        )
    );
}

const solveTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_SOLVE),
        switchMap(action => from(api.solveTodoApiRequest(action.payload) as ObservableInput<SolveTodoResult>).pipe(
            mergeMap(response => {
                return of(todoSolved(response.id));
            }))
        )
    );
}

const deleteTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_DELETE),
        switchMap(action => from(api.deleteTodoApiRequest(action.payload) as ObservableInput<DeleteTodoResult>).pipe(
            mergeMap(response => {
                return of(todoDeleted(response.id));
            }))
        )
    );
}

export default combineEpics(
    addTodoEpic, 
    getAllTodosEpic,
    updateTodoEpic,
    solveTodoEpic,
    deleteTodoEpic
);