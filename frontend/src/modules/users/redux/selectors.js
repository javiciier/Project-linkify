/* ------------------------- FUNCIONES AUXILIARES ------------------------- */
const isEmpty = (obj) => {
    let hasItems = Object.keys(obj).length !== 0;
    let isObject = obj.constructor === Object;

    return (obj && isObject && !hasItems);
}

/**
 * Obtiene el estado asociado a los usuarios.
 * @returns Estado asociado a los usuarios.
 */
const getUsersState = (state) => state.users;

/**
 * Obtiene los datos del usuario recibidos por el backend 
 * @returns Usuario loggeado en el sistema
 */
const getUser = (state) => getUsersState(state).user;

/**
 * Comprueba si el usuario tiene sesión iniciada
 * @returns Booleano indicando si usuario tiene sesión iniciada
 */
export const isLoggedIn = (state) => !isEmpty(getUser(state));

/* ------------------------- SELECTORES ------------------------- */
/**
 * Obtiene los datos del usuario con la sesión iniciada actualmente.
 * @returns 
 */
export const getUserData = (state) => getUser(state).user;

/**
 * Obtiene el identificador del usuario.
 * @returns ID del usuario
 */
export const getUserId = (state) => getUserData(state)?.id;

/**
 * Obtiene el apodo del usuario.
 * @returns String con el nickname del usuario (o null si no está loggeado)
 */
export const getNickname = (state) => getUserData(state)?.nickName;

/**
 * Obtiene el nombre del usuario.
 * @returns String con el nombre del usuario (o null si no está loggeado)
 */
export const getName = (state) => getUserData(state)?.name;

/**
 * Obtiene el primer apellido del usuario.
 * @returns String con el nombre del usuario (o null si no está loggeado)
 */
export const getSurname1 = (state) => getUserData(state)?.surname1;

/**
 * Obtiene el segundo apellido del usuario.
 * @returns String con el nombre del usuario (o null si no está loggeado)
 */
export const getSurname2 = (state) => getUserData(state)?.surname2;

/**
 * Obtiene la imagen de perfil del usuario.
 * @returns String con la imagen codificada en Base64
 */
export const getAvatar = (state) => getUserData(state)?.avatar;

/**
 * Obtiene el email del usuario.
 * @returns String con la imagen codificada en Base64
 */
export const getEmail = (state) => getUserData(state)?.email;

/**
 * Obtiene la contraseña (hasheada) del usuario.
 * @returns String con la imagen codificada en Base64
 */
 export const getHashedPassword = (state) => getUserData(state)?.password;