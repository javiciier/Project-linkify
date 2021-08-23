import * as actionTypes from './actionTypes';


/* ****************************************** ACCIONES ****************************************** */
/**
 * Comprueba si la conexión con el backend es posible
 * @returns {Object} - Tipo de la acción
 */
export const connectToBackend  = () => ({
    type: actionTypes.CONNECT_TO_BACKEND
})


/**
 * Devuelve una acción para indicar que se está cargando la página.
 * @returns {Object} - Tipo de la acción
 */
export const loading = () => ({
    type: actionTypes.LOADING
})


/**
 * Devuelve una acción para indicar que se ha cargado la página.
 * @returns {Object} - Tipo de la acción
 */
export const loaded = () => ({
    type: actionTypes.LOADED
})


/**
 * Devuelve una acción para indicar que se produjo algún error al cargar la página.
 * @returns {Object} - Tipo de la acción
 */
export const error = (error) => ({
    type: actionTypes.ERROR,
    error
})


/**
 * Devuelve una acción para indicar que se ha limpiado el error del estado.
 * @returns {Object} - Tipo de la acción
 */
export const clearError = () => ({
    type: actionTypes.CLEAR_ERROR
})
