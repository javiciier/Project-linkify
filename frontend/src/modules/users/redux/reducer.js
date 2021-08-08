import {combineReducers} from 'redux';
import * as actionTypes from './actionTypes';

const defaultState = {
    user: {}
}


/**
 * Máquina de estados para el estado del usuario
 * @param {Object} state - Estado actual
 * @param {String} action - Acción a ejecutar
 */
const user = (state = defaultState.user, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_COMPLETED:
            return action.loggedInUser;
        
        case actionTypes.SIGN_UP_COMPLETED:
            return action.signedUpUser.user;
            
        case actionTypes.UPDATE_PROFILE_COMPLETED:
            return action.user;
                    
        case actionTypes.LOGOUT_COMPLETED:
            return defaultState.user;

        case actionTypes.GET_AVATAR_COMPLETED:
            return action.avatar;

        case actionTypes.SET_AVATAR_COMPLETED:
            return action.avatar;

        default:
            return state;
    }
}

const reducer = combineReducers({
    user
});

export default reducer;

