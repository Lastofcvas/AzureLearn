import { todoAdded, todoDeleted, todoLoaded, todoSolved, todoUpdated } from "./actions";
import reducer, { initialState } from "./reducer";
import { Todo, TodoState } from "./types";

describe('Todo reducer', () => {
    it('shoulud return the initial state', () => {
        expect(reducer(initialState, {type: 'TEST'} as any)).toBe(initialState);
    });

    it('should return the state with several items', () => {
        const payload: Todo[] = [
            {
                id: "12",
                description: "first todo item",
                isCompleted: true
            },
            {
                id: "45456",
                description: "second todo item",
                isCompleted: false
            },
            {
                id: "54656",
                description: "third todo item",
                isCompleted: false
            }
        ]
        const expected = [...payload];

        const result: TodoState = reducer(initialState, todoLoaded(payload));

        expect(result).toEqual(expected);
    })

    it('should return a state with new item', () => {
        const payload: Todo = {
            id: "unique-key",
            description: "test todo item",
            isCompleted: false
        }
        const expected: Todo[] = [
            {
                ...payload
            }
        ];

        const result: TodoState = reducer(initialState, todoAdded(payload));
        
        expect(result).toEqual(expected);
    })

    it('should return a state with updated item', () => {
        const payload: Todo = {
            id: "unique-key",
            description: "todo item",
            isCompleted: false
        }
        const updatedPayload: Todo = {
            id: "unique-key",
            description: "testing update",
            isCompleted: false
        }
        const expected: Todo[] = [
            {
                ...updatedPayload
            }
        ]

        const result: TodoState = reducer(initialState, todoAdded(payload));
        const updatedResult: TodoState = reducer(result, todoUpdated(updatedPayload));

        expect(updatedResult).toEqual(expected);
    })

    it('should return a state with solved todo item', () => {
        const payload: string = "unique-key";
        const todo: Todo = {
            id: "unique-key",
            description: "test todo item",
            isCompleted: false
        }
        const expected: Todo[] = [
            {...todo, isCompleted: true}
        ]

        const result: TodoState = reducer(initialState, todoAdded(todo));
        const updatedResult: TodoState = reducer(result, todoSolved(payload));

        expect(updatedResult).toEqual(expected);
    })

    it('should return a state without a todo item', () => {
        const payload: string = "unique-key";
        const todo: Todo = {
            id: "unique-key",
            description: "test todo item",
            isCompleted: false
        }

        const result: TodoState = reducer(initialState, todoAdded(todo));
        const updatedResult: TodoState = reducer(result, todoDeleted(payload));

        expect(updatedResult).toEqual(initialState);
    })
});
