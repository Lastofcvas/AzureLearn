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
import { mergeMap, from, map } from "rxjs";

const getAllTodosEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_GETALL),
        mergeMap(() => from(api.getAllTodosApiRequest()).pipe(
            map(response => todoLoaded(response.todos))
        ))
    )
}

const addTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_ADD),
        mergeMap(action => from(api.addTodoApiRequest(action.payload)).pipe(
            map(response => todoAdded(response.todo)))
        )
    );
}

const updateTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_UPDATE),
        mergeMap(action => from(api.updateTodoApiRequest(action.payload)).pipe(
            map(response => todoUpdated(response.todo))
          )
        )
    );
}

const solveTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_SOLVE),
        mergeMap(action => from(api.solveTodoApiRequest(action.payload)).pipe(
            map(response => todoSolved(response.id))
          )
        )
    );
}

const deleteTodoEpic: Epic<TodoCommandAction> = (action$, state$, { api }) => {
    return action$.pipe(
        ofType(TODO_DELETE),
        mergeMap(action => from(api.deleteTodoApiRequest(action.payload)).pipe(
            map(response => todoDeleted(response.id))
          )
        )
    );
}

export default combineEpics(
    addTodoEpic, 
    getAllTodosEpic,
    updateTodoEpic,
    solveTodoEpic,
    deleteTodoEpic,
);