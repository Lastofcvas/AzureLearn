import { TodoDocumentAction, TODO_ADDED, TODO_DELETED, TODO_LOADED, TODO_SOLVED, TODO_UPDATED } from "./actions";
import { TodoState } from "./types";

export const initialState: TodoState = [];

const reducer = (state: TodoState = initialState, action: TodoDocumentAction): TodoState => {
    switch(action.type) {
        case TODO_LOADED:
            return action.payload;
        case TODO_ADDED:
            return [...state, action.payload];
        case TODO_UPDATED:
            const updatedIndex = state.findIndex(todo => todo.id === action.payload.id);

            return [
                state[updatedIndex] = action.payload, 
                ...state.filter(todo => todo.id !== action.payload.id)
            ];
        case TODO_SOLVED:
            const solvedIndex = state.findIndex(todo => todo.id === action.payload);
            
            return [
                {
                    ...state[solvedIndex], 
                    isCompleted: true
                },
                ...state.filter(todo => todo.id !== action.payload)
            ];
        case TODO_DELETED:
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
}

export default reducer;