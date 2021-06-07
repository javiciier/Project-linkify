import * as actionTypes from './actionTypes';


/* ****************************************** ACCIONES ****************************************** */
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
