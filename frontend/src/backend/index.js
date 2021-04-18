import {init} from './backendUtils';
import * as userService from './services/userServices';


export {default as ServiceError} from './exceptions/ServiceError'
export default {init, userService};
