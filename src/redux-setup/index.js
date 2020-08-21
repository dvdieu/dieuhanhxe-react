import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger'

//redux, saga
import root_saga from '../saga-setup';
import root_reducer from './reducers';

const logger = createLogger({
    predicate: (getState, action) => true,
    collapsed: true,
    duration: true,
    diff: true,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    root_reducer,
    composeWithDevTools(
        compose(
            applyMiddleware(
                sagaMiddleware,
                logger
            )),
    ));

// const store = createStore(
//     root_reducer,
//     compose(
//         applyMiddleware(
//             sagaMiddleware,
//         ),
//     ),
// );

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
sagaMiddleware.run(root_saga);
// Exports
export {
    store,
    persistor,
};
