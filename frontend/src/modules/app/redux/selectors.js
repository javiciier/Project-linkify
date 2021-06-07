/**
 * Obtiene el estado asociado a la aplicación.
 * @returns Estado asociado a la apliación
 */
const getAppState = (state) => state.app;

/**
 * Obtiene el error actual en la aplicación.
 * @returns {Object} - Detalles del error
 */
export const getError = (state) => getAppState(state).error;

/**
 * Comprueba si la apliación se está cargando.
 * @returns {Object} - Booleano indicando si se está cargando
 */
export const isLoading = (state) => getAppState(state).loading;
