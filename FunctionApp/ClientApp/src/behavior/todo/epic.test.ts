import { addTodo, deleteTodo, getAllTodos, solveTodo, todoAdded, TodoCommandAction, todoDeleted, todoLoaded, todoSolved, todoUpdated, TODO_ADD, TODO_DELETE, TODO_GETALL, TODO_SOLVE, TODO_UPDATE, updateTodo } from "./actions"
import epic from "./epic";
import { runSheduler } from '../../utils/testing';
import { StateObservable } from "redux-observable";
import { EMPTY } from 'rxjs';
import { Todo } from '../todo/types';
import { RootState } from "../../store/store";
import { HotObservable } from "rxjs/internal/testing/HotObservable";
import { StoreDependencies } from "../../store/types";

describe('Todo epic', () => {
    const api = {
        getAllTodosApiRequest: jest.fn(),
        addTodoApiRequest: jest.fn(),
        updateTodoApiRequest: jest.fn(),
        solveTodoApiRequest: jest.fn(),
        deleteTodoApiRequest: jest.fn()
    };

    const marbles = {
        actions: '-a--',
        api: '    --a-',
        results: '---a'
    };

    const todo: Todo = {
        description: "test todo",
        id: "unique-key",
        isCompleted: false 
    }

    it(`fetch all todos on ${TODO_GETALL}`, () => {
        runSheduler(({ hot, cold, expectObservable }) => {            
            const todos: Todo[] = [
                {
                    description: "Complete TodoApp using AzureFunctions",
                    id: "unique-key",
                    isCompleted: true
                }
            ];

            const action$ = hot(marbles.actions, { 
                a: getAllTodos()
            });

            const state$ = new StateObservable(EMPTY, { todo: [] } as RootState);
            const output$ = epic(action$ as HotObservable<TodoCommandAction>, state$ as StateObservable<RootState>, { api } as StoreDependencies);

            api.getAllTodosApiRequest.mockReturnValue(cold(marbles.api, { a: { todos: todos } }));

            expectObservable(output$).toBe(marbles.results, {
                a: todoLoaded(todos)
            });
        });
    });

    it(`add todo on ${TODO_ADD}`, () => {
        runSheduler(({hot, cold, expectObservable}) => {
            const action$ = hot(marbles.actions, {
                a: addTodo(todo)
            });

            const state$ = new StateObservable(EMPTY, { todo: [] } as RootState);
            const output$ = epic(action$ as HotObservable<TodoCommandAction>, state$ as StateObservable<RootState>, { api } as StoreDependencies);

            api.addTodoApiRequest.mockReturnValue(cold(marbles.api, { a: { todo: todo } }));

            expectObservable(output$).toBe(marbles.results, {
                a: todoAdded(todo)
            });
        })
    })

    it(`update todo on ${TODO_UPDATE}`, () => {
        runSheduler(({hot, cold, expectObservable}) => {
            const updatedTodo: Todo = {
                description: "update works",
                id: "unique-key",
                isCompleted: false 
            }

            const action$ = hot(marbles.actions, {
                a: updateTodo(updatedTodo)
            });

            const state$ = new StateObservable(EMPTY, { todo: [todo] } as RootState);
            const output$ = epic(action$ as HotObservable<TodoCommandAction>, state$ as StateObservable<RootState>, { api } as StoreDependencies);

            api.updateTodoApiRequest.mockReturnValue(cold(marbles.api, { a: { todo: updatedTodo } }));

            expectObservable(output$).toBe(marbles.results, {
                a: todoUpdated(updatedTodo)
            });
        })
    })

    it(`solve todo on ${TODO_SOLVE}`, () => {
        runSheduler(({hot, cold, expectObservable}) => {
            const id: string = "unique-key";

            const action$ = hot(marbles.actions, {
                a: solveTodo(id)
            });

            const state$ = new StateObservable(EMPTY, { todo: [todo] } as RootState);
            const output$ = epic(action$ as HotObservable<TodoCommandAction>, state$ as StateObservable<RootState>, { api } as StoreDependencies);

            api.solveTodoApiRequest.mockReturnValue(cold(marbles.api, { a: { id: id } }));

            expectObservable(output$).toBe(marbles.results, {
                a: todoSolved(id)
            });
        })
    })

    it(`delete todo on ${TODO_DELETE}`, () => {
        runSheduler(({hot, cold, expectObservable}) => {
            const id: string = "unique-key";

            const action$ = hot(marbles.actions, {
                a: deleteTodo(id)
            });

            const state$ = new StateObservable(EMPTY, { todo: [todo] } as RootState);
            const output$ = epic(action$ as HotObservable<TodoCommandAction>, state$ as StateObservable<RootState>, { api } as StoreDependencies);

            api.deleteTodoApiRequest.mockReturnValue(cold(marbles.api, { a: { id: id } }));

            expectObservable(output$).toBe(marbles.results, {
                a: todoDeleted(id)
            });
        })
    })
})