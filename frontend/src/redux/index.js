import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import globalReducer from './globalReducer';

const configureStore = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || 
        compose;

    const middlewares = [thunk];

    return createStore(globalReducer, composeEnhancers(
       applyMiddleware(...middlewares)));

}

export default configureStore;
