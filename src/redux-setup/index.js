import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

//redux, saga
import root_saga from '../saga-setup';
import root_reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    root_reducer,
    compose(
        applyMiddleware(
            sagaMiddleware
        ),
    ),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
sagaMiddleware.run(root_saga);
// Exports
export {
    store,
    persistor,
};
