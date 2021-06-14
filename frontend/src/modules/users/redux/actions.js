import backend from '../../../backend';
import * as actionTypes from './actionTypes';

import app from '../../app';

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
                dispatch(loginCompleted(loggedInUser));
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
            dispatch(signedUpCompleted(signedUpUser));
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
            onSuccessCallback();
        }

        backend.userService.updateProfile(user, onSuccess, onErrorCallback);
    }


export const changePassword = (userId, oldPassword, newPassword, onSuccessCallback, onErrorCallback) => {
    backend.userService.changePassword(userId, oldPassword, newPassword, onSuccessCallback, onErrorCallback);
}

/* ****************************************** ACCIONES ****************************************** */
/**
 * Devuelve una acción para indicar que se ha completado el login.
 * @param {Object} loggedInUser - Datos del usuario 
 * @returns {Object} - Tipo de la acción y datos del usuario.
 */
const loginCompleted = (loggedInUser) => ({
    type: actionTypes.LOGIN_COMPLETED,
    loggedInUser
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
const signedUpCompleted = (signedUpUser) => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    signedUpUser
})


/**
 * Devuelve una acción para indicar que se han modificado los datos del usuario.
 * @returns {Object} - Tipo de la acción y datos actualizados del usuario
 */
const updateProfileCompleted = (updatedUser) => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    updatedUser
})
