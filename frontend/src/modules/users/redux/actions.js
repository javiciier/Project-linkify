import backend from '../../../backend';
import * as actionTypes from './actionTypes';

/* ***************************************** MIDDLEWARE ***************************************** */
/**
 * Acción para iniciar sesión en el servicio.
 * @param {String} nickName - Nombre de usuario
 * @param {String} password - Contraseña
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de login exitoso
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 */
export const login = (nickName, password, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) =>
    dispatch => {
        let onSuccess = (loggedInUser) => {
            dispatch(loginCompleted(loggedInUser));
            onSuccessCallback();
        }

        backend.userService.login(nickName, password, onSuccess, onErrorCallback, onUnauthorizedCallback);

    }


/**
 * Acción para iniciar sesión en el servicio a partir del JWT.
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 */
export const loginFromToken = (onUnauthorizedCallback) =>
    dispatch => {
        let onSuccess = (loggedInUser) => {
            if (loggedInUser)
                dispatch(loginUsingTokenCompleted(loggedInUser));
        }
        
        backend.userService.loginFromToken(onSuccess, onUnauthorizedCallback);
    } 

/**
 * Acción para cerrar sesión en el servicio.
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de logout exitoso
 * @returns {Object} - Estado indicando que se ha cerrado sesión
 */
export const logout = () => 
    dispatch => {
        backend.userService.logout();
        dispatch(logoutCompleted());
    }


/**
 * Acción para registrar un nuevo usuario en el servicio.
 * @param {Object} user - Datos del nuevo usuario
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de registro exitoso
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 * @returns 
 */
export const signUp = (user, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) =>
    dispatch => {
        let onSuccess = (signedUpUser) => {
            dispatch(signUpCompleted(signedUpUser));
            onSuccessCallback();
        }

        backend.userService.signUp(user, onSuccess, onErrorCallback, onUnauthorizedCallback);
    }


/**
 * Acción para actualizar los datos de un usuario.
 * @param {Object} user - Datos nuevos del usuario
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de actualización exitosa
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 */
export const updateProfile = (user, onSuccessCallback, onErrorCallback) =>
    dispatch => {
        let onSuccess = (updatedUser) => {
            dispatch(updateProfileCompleted(updatedUser));
            onSuccessCallback(updatedUser);
        }
        backend.userService.updateProfile(user, onSuccess, onErrorCallback);
    }


/**
 * Acción para cambiar la contraseña del usuario.
 * @param {Number} userId - Id del usuario
 * @param {String} oldPassword - Antigua contraseña
 * @param {String} newPassword - Nueva contraseña
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de actualización exitosa
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 */
export const changePassword = (userId, oldPassword, newPassword, onSuccessCallback, onErrorCallback) => {
    backend.userService.changePassword(userId, oldPassword, newPassword, onSuccessCallback, onErrorCallback);
}


/**
 * Obtiene la imagen de perfil (avatar) del usuario.
 * @param {*} userId - Id del usuario 
 * @param {*} onSuccessCallback - Función a ejecutar en caso de éxito
 * @param {*} onErrorCallback - Función a ejecutar en caso de error
 * @param {*} onUnauthorizedCallback - Función a ejecutar en caso de permisos insuficientes
 */
export const getAvatar = (userId, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) =>
    dispatch => {
        let onSuccess = (avatar) => {
            dispatch(getAvatarCompleted(avatar));
            onSuccessCallback();
        }

        backend.userService.getAvatar(userId, onSuccess, onErrorCallback, onUnauthorizedCallback);
}


/**
 * Establece una nueva imagen de perfil (avatar) del usuario.
 * @param {Number} userId - Id del usuario 
 * @param {String} avatar - String de la nueva imagen en Base64
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de éxito
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de permisos insuficientes
 */
 export const setAvatar = (userId, avatar, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) =>
    dispatch => {
        let onSuccess = (avatar) => {
            dispatch(setAvatarCompleted(avatar));
            onSuccessCallback();
        }

        backend.userService.setAvatar(userId, avatar, onSuccess, onErrorCallback, onUnauthorizedCallback);
}


/**
 * Elimina un usuario de la aplicación.
 * @param {*} userId - Id del usuario a eliminar
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de éxito
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de permisos insuficientes
 * @returns 
 */
export const deleteUser = (userId, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) =>
    dispatch => {
        let onSuccess = (userId) => {
            dispatch(setDeleteUserCompleted(userId));
            onSuccessCallback();
        }

        backend.userService.deleteUser(userId, onSuccess, onErrorCallback, onUnauthorizedCallback);
    }


/* ****************************************** ACCIONES ****************************************** */
/**
 * Devuelve una acción para indicar que se ha completado el login.
 * @param {Object} signedUpUser - Datos del usuario y token de sesión JWT
 * @returns {Object} - Tipo de la acción y datos del usuario.
 */
const loginCompleted = (loggedInUser) => ({
    type: actionTypes.LOGIN_COMPLETED,
    loggedInUser
})


/**
 * Devuelve una acción para indicar que se ha completado el login a partir del JWT.
 * @param {Object} user - Datos del usuario 
 * @returns {Object} - Tipo de la acción y datos del usuario.
 */
const loginUsingTokenCompleted = (user) => ({
    type: actionTypes.LOGIN_USING_TOKEN_COMPLETED,
    user
})


/**
 * Devuelve una acción para indicar que se ha cerrado sesión.
 * @returns {Object} - Tipo de la acción
 */
const logoutCompleted = () => ({
    type: actionTypes.LOGOUT_COMPLETED
})


/**
 * Devuelve una acción para indicar que se ha registrado un nuevo usuario.
 * @returns {Object} - Tipo de la acción y datos del nuevo usuario
 */
const signUpCompleted = (signedUpUser) => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    signedUpUser
})


/**
 * Devuelve una acción para indicar que se han modificado los datos del usuario.
 * @returns {Object} - Tipo de la acción y datos actualizados del usuario
 */
const updateProfileCompleted = (user) => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    user
})


/**
 * Devuelve una acción con el avatar del usuario.
 * @returns {String} - Tipo de la acción y avatar del usuario en Base64
 */
const getAvatarCompleted = (avatar) => ({
    type: actionTypes.GET_AVATAR_COMPLETED,
    avatar
})


/**
 * Devuelve una acción con el nuevo avatar del usuario.
 * @returns {String} - Tipo de la acción y nuevo avatar del usuario en Base64
 */
const setAvatarCompleted = (avatar) => ({
    type: actionTypes.SET_AVATAR_COMPLETED,
    avatar
})



/**
 * Devuelve una acción para indicar que se ha eliminado a un usuario.
 * @returns {String} - Tipo de la acción
 */
const setDeleteUserCompleted = (userId) => ({
    type: actionTypes.DELETE_USER_COMPLETED,
    userId
})