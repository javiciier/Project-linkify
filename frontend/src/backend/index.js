import {setDefaultServiceError} from './backendUtils';
import * as userService from './services/userServices';


export {default as ServiceError} from './exceptions/ServiceError';
export {default as PermissionError} from './exceptions/PermissionError';
export default {setDefaultServiceError, userService};
