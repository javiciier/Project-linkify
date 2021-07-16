/**
 * Permisos insuficientes para realizar una operación.
 */
 class PermissionError extends Error {
    /**
     * @constructor
     * @param {String} details - Detalles del error
     */
    constructor(details) {
        super(`${PermissionError.name}: ${details}`);
        this.details = details;
    }

    /**
     * Devuelve los deatalles del error
     * @returns {String} Detalles del error
     */
    getDetails() {
        return this.details;
    }
    
    /**
     * Devuelve un objeto representando el error
     * @returns {Object} Datos del error
     */
    toObject() {
        return {
            errorName: PermissionError.name,
            details: this.getDetails()
        }
    }
}

export default PermissionError;
