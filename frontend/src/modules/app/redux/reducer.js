import {combineReducers} from 'redux';
import * as actionTypes from './actionTypes';

const initialState = {
    loading: false,
    error: {},
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
            return action.data;
        
        default:
            return state;
    }
}


const reducer = combineReducers({
    loading,
    error
});

export default reducer;
