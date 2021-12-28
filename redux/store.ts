import {applyMiddleware, combineReducers, compose, createStore, Store} from 'redux';
import {createWrapper, Context} from 'next-redux-wrapper';
import rootReducer from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import {Task} from "@redux-saga/types";
import rootSaga from "./sagas";

export type RootState = ReturnType<typeof rootReducer>

export interface SagaStore extends Store {
    sagaTask?: Task;
}

let composeEnhancers = compose;

if(typeof window !== "undefined") {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}

let store: Store;

export const makeStore = (context: Context) => {
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export {store}

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

