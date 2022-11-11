import rootReducer from "./rootReducer"
import { createStore } from "redux"
import reducer from "./behavior/todo/reducer";

const configureStore = () => {
    const store = createStore(
        rootReducer
    );

    return store;
} 


export default configureStore();