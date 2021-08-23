import {combineReducers} from 'redux';
import * as actionTypes from './actionTypes';

const initialState = {
    loading: true,
    error: null,
};


const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return true;

        case actionTypes.LOADED:
            return false;

        case actionTypes.ERROR:
            return false;
    
        default:
            return state;
    }
}


const error = (state = initialState.error, action) => {
    switch (action.type) {
        case actionTypes.ERROR:
            return action.error;
        
        case actionTypes.CLEAR_ERROR:
            return initialState.error;
        
        default:
            return state;
    }
}


const reducer = combineReducers({
    loading,
    error
});

export default reducer;
