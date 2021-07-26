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
export const getUser = (state) => getUsersState(state).user;

/**
 * Obtiene los datos del usuario con la sesión iniciada actualmente.
 * @returns 
 */
export const getUserData = (state) => getUser(state).user;

/**
 * Comprueba si el usuario tiene sesión iniciada
 * @returns Booleano indicando si usuario tiene sesión iniciada
 */
export const isLoggedIn = (state) => !isEmpty(getUser(state));


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
export const getName = (state) =>
    isLoggedIn(state) ? getUserData(state)?.name : '!';


export const getAvatar = (state) =>
    isLoggedIn(state) ? getUserData(state)?.avatar : '!';
