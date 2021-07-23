import {backendFetch, configFetchParameters, getUserJWT, setUserJWT, removeUserJWT, setOnUnauthorizedErrorCallback} from '../backendUtils';


const USER_ENDPOINT = '/users'

/* ****************************************** SERVICIOS ***************************************** */
/**
 * Inicia sesión en el servicio mediante su nombre de usuario y su contraseña.
 * Recibe tres callback para ejecutar cuando se complete el login correctamente, cuando se produzca
 * algún error o cuando el usuario no esté autorizado para logearse.
 * @param {String} nickName - Nombre de usuario
 * @param {String} password - Contraseña
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de login exitoso
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 */
export const login = (nickName, password, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) => {
    // Parámetros de la petición
    const loginEndpoint = `${USER_ENDPOINT}/login`;
    let fetchConfig = configFetchParameters('POST', {nickName, password});
    let onSuccess = (authenticatedUser) => {
        setOnUnauthorizedErrorCallback(onUnauthorizedCallback);
        setUserJWT(authenticatedUser.token);
        onSuccessCallback(authenticatedUser);
    }

    // Llamada al servicio
    backendFetch(loginEndpoint, fetchConfig, onSuccess, onErrorCallback);
}


/**
 * Inicia sesión en el servicio empleando la información contenida en el JWT.
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de login exitoso
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 */
export const loginFromToken = (onSuccessCallback, onUnauthorizedCallback) => {
    // Parámetros de la petición
    const loginFromTokenEndpoint = `${USER_ENDPOINT}/loginUsingToken`;
    let fetchConfig = configFetchParameters('POST');
    let onSuccess = (authenticatedUser) => {
        onSuccessCallback(authenticatedUser);
    }
    let onError = () => removeUserJWT();


    const token = getUserJWT();     // Obtener el token guardado actualmente
    if (!token) {                   // Si no hay token, no hay autorización para iniciar sesión
        onSuccessCallback();
        return;
    }

    setOnUnauthorizedErrorCallback(onUnauthorizedCallback);

    // Llamada al servicio
    backendFetch(loginFromTokenEndpoint, fetchConfig, onSuccess, onError);
}


/**
 * Cierra la sesión del usuario.
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de logout exitoso
 */
export const logout = () => {removeUserJWT()}


/**
 * Crea una cuenta de usuario con los parámetros indicados.
 * @param {Object} userData - Datos del nuevo usuario
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de signUp exitoso
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 * @param {Function} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 */
export const signUp = (userData, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) => {
    // Parámetros de la petición
    const signUpEndpoint = `${USER_ENDPOINT}/signUp`;
    let fetchConfig = configFetchParameters('POST', userData);
    let onSuccess = (signedUpUser) => {
        setOnUnauthorizedErrorCallback(onUnauthorizedCallback);
        setUserJWT(signedUpUser.token);
        onSuccessCallback(signedUpUser);
    }

    // Llamada al servicio
    backendFetch(signUpEndpoint, fetchConfig, onSuccess, onErrorCallback);
}


/**
 * Actualiza la información de un usuario a partir de los datos recibidos.
 * @param {Object} userData - Datos a actualizar
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de actualización exitosa
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error
 */
export const updateProfile = (userData, onSuccessCallback, onErrorCallback) => {
    // Parámetros de la petición
    const updateProfileEndpoint = `${USER_ENDPOINT}/${userData.id}/updateProfile`;
    let fetchConfig = configFetchParameters('PUT', userData);

    // Llamada al servicio
    backendFetch(updateProfileEndpoint, fetchConfig, onSuccessCallback, onErrorCallback);
}


/**
 * Actualiza la contraseña del usuario indicado mediante su ID.
 * @param {Number} id - Id del usuario
 * @param {String} oldPassword - Antigua contraseña
 * @param {String} newPassword - Nueva contraseña
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de actualización correcta
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error 
 */
export const changePassword = (id, oldPassword, newPassword, onSuccessCallback, onErrorCallback) => {
    // Parámetros de la petición
    const changePasswordEndpoint = `${USER_ENDPOINT}/${id}/changePassword`;
    let fetchConfig = configFetchParameters('POST', {oldPassword, newPassword});
    
    // Llamada al servicio
    backendFetch(changePasswordEndpoint, fetchConfig, onSuccessCallback, onErrorCallback);
}


/**
 * Obtiene el avatar (imagen de perfil) del usuario recibido.
 * @param {Number} id - Id del usuario
 * @param {*} onSuccess - Función a ejecutar en caso de éxito
 * @param {*} onErrorCallback - Función a ejecutar en caso de error
 * @param {*} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 */
export const getAvatar = (id, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) => {
    // Parámetros de la petición
    const getAvatarEndpoint = `${USER_ENDPOINT}/${id}/avatar`;
    let fetchConfig = configFetchParameters('GET');
    let onSuccess = (avatar) => {
        setOnUnauthorizedErrorCallback(onUnauthorizedCallback);
        onSuccessCallback(avatar);
    }

    // Llamada al servicio
    backendFetch(getAvatarEndpoint, fetchConfig, onSuccess, onErrorCallback)
}


/**
 * Modifica el avatar (imagen de perfil) del usuario recibido con la imagen recibida.
 * @param {*} id - Id del usuario
 * @param {*} avatar - Datos de la nueva imagen
 * @param {*} onSuccess - Función a ejecutar en caso de éxito
 * @param {*} onErrorCallback - Función a ejecutar en caso de error
 * @param {*} onUnauthorizedCallback - Función a ejecutar en caso de no estar autorizado
 */
export const setAvatar = (id, avatar, onSuccessCallback, onErrorCallback, onUnauthorizedCallback) => {
    // Parámetros de la peticion
    const setAvatarEndpoint = `${USER_ENDPOINT}/${id}/avatar`;
    let fetchConfig = configFetchParameters('POST', {'imageFile': avatar});
    let onSuccess = (avatar) => {
        setOnUnauthorizedErrorCallback(onUnauthorizedCallback);
        onSuccessCallback(avatar);
    }

    // Llamada al servicio
    backendFetch(setAvatarEndpoint, fetchConfig, onSuccess, onErrorCallback);
}
