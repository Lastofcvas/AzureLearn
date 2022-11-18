import configureStore from "./store";
import createApi from "../api/createApi";
import { StoreDependencies } from "./types";

export const api = createApi();

const dependencies: StoreDependencies = {
    api
} 

const store = configureStore(dependencies);
export default store;