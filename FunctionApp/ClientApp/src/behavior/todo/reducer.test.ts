import reducer, { initialState } from "./reducer";

describe('Todo reducer', () => {
    it('shoulud return the initial state', () => {
        expect(reducer(initialState, {type: 'TEST'} as any)).toBe(initialState);
    });
});
