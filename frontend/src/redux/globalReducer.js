import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';


const globalReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
});

export default globalReducer;
