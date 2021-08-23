/**
 * Error de red al recibir respuesta del backend.
 */
class ServiceError extends Error {
    /**
     * @constructor
     * @param {String} details - Detalles del error
     */
    constructor(details) {
        super(`${ServiceError.name}: ${details}`);
        this.details = details;
    }

    /**
     * Devuelve los deatalles del error
     * @returns {String} Detalles del error
     */
    getDetails = () => this.details;
    
    /**
     * Devuelve un objeto representando el error
     * @returns {Object} Datos del error
     */
    toObject = () => (
        {
            errorName: `${ServiceError.name}`,
            details: this.getDetails(),
        }
    );
    
}
export default ServiceError;
