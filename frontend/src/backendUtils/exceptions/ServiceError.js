/**
 * Error de red al recibir respuesta del backend.
 */
class ServiceError extends Error {
    /**
     * @constructor
     * @param {String} details - Detalles del error
     */
    constructor(details) {
        super(`${ServiceError.name}: ${details}`)
    }
}

export default ServiceError;
