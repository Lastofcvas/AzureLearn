import { TodoDocumentAction, TODO_ADDED, TODO_DELETED, TODO_LOADED, TODO_SOLVED, TODO_UPDATED } from "./actions";
import reducer, { initialState } from "./reducer";
import { Todo, TodoState } from "./types";

describe('Todo reducer', () => {
    it('shoulud return the initial state', () => {
        expect(reducer(initialState, {type: 'TEST'} as any)).toBe(initialState);
    });

    it('should return the state with several items', () => {
        const payload = [
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
        ] as Todo[];
        const expected = [...payload];

        const result = reducer(initialState, {type: TODO_LOADED, payload: payload} as TodoDocumentAction) as TodoState;

        expect(result).toEqual(expected);
    })

    it('should return a state with new item', () => {
        const payload = {
            id: "unique-key",
            description: "test todo item",
            isCompleted: false
        } as Todo;
        const expected = [
            {
                ...payload
            }
        ] as Todo[];

        const result = reducer(initialState, {type: TODO_ADDED, payload: payload} as TodoDocumentAction) as TodoState;
        
        expect(result).toEqual(expected);
    })

    it('should return a state with updated item', () => {
        const payload = {
            id: "unique-key",
            description: "todo item",
            isCompleted: false
        } as Todo;
        const updatedPayload = {
            id: "unique-key",
            description: "testing update",
            isCompleted: false
        } as Todo;
        const expected = [
            {
                ...updatedPayload
            }
         ] as Todo[];

        const result = reducer(initialState, { type: TODO_ADDED, payload: payload }) as TodoState;
        const updatedResult = reducer(result, { type: TODO_UPDATED, payload: updatedPayload }) as TodoState;

        expect(updatedResult).toEqual(expected);
    })

    it('should return a state with solved todo item', () => {
        const payload: string = "unique-key";
        const todo = {
            id: "unique-key",
            description: "test todo item",
            isCompleted: false
        } as Todo;
        const expected = [
            {...todo, isCompleted: true}
        ] as Todo[];

        const result = reducer(initialState, { type: TODO_ADDED, payload: todo }) as TodoState;
        const updatedResult = reducer(result, { type: TODO_SOLVED, payload: payload }) as TodoState;

        expect(updatedResult).toEqual(expected);
    })

    it('should return a state without a todo item', () => {
        const payload: string = "unique-key";
        const todo = {
            id: "unique-key",
            description: "test todo item",
            isCompleted: false
        } as Todo;

        const result = reducer(initialState, { type: TODO_ADDED, payload: todo }) as TodoState;
        const updatedResult = reducer(result, { type: TODO_DELETED, payload: payload }) as TodoState;

        expect(updatedResult).toEqual(initialState);
    })
});
