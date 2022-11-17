import rootReducer from "./rootReducer";
import { applyMiddleware, createStore } from "redux";
import rootEpic from "./rootEpic";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore (dependencies: any)  {
    const epicMiddleware = createEpicMiddleware({ dependencies });

    const middlewares = [epicMiddleware];
    const middlewareEnchancer = applyMiddleware(...middlewares);

    const enchancers = [middlewareEnchancer];
    const composedEnchancers = composeWithDevTools(...enchancers);
    
    const store = createStore(
        rootReducer,
        composedEnchancers
    );

    epicMiddleware.run(rootEpic as any);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;