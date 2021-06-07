/**
 * Obtiene el estado asociado a los usuarios.
 * @returns Estado asociado a los usuarios.
 */
const getUsersState = (state) => state.users;

/**
 * Obtiene el usuario loggeado en el sistema actualmente 
 * @returns Usuario loggeado en el sistema
 */
export const getUser = (state) => getUsersState(state).user;

/**
 * Comprueba si el usuario tiene sesión iniciada
 * @returns Booleano indicando si usuario tiene sesión iniciada
 */
export const isLoggedIn = (state) => getUser(state) !== {};

/**
 * Obtiene el apodo del usuario.
 * @returns String con el nickname del usuario (o null si no está loggeado)
 */
export const getNickname = (state) =>
    isLoggedIn(state) ? getUser(state).nickName : null;

/**
 * Obtiene el nombre del usuario.
 * @returns String con el nombre del usuario (o null si no está loggeado)
 */
export const getName = (state) =>
    isLoggedIn(state) ? getUser(state).name : null;
