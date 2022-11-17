import configureStore from "./store";
import createApi from "../api/createApi";

export const api = createApi();

const dependencies = {
    api
} 

const store = configureStore(dependencies);
export default store;