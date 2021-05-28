import {combineReducers} from 'redux';

import users from '../modules/users';

const globalReducer = combineReducers({
    users: users.reducer,
    
});

export default globalReducer;
