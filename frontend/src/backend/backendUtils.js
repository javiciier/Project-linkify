import 'dotenv';
import HTTP_STATUS_CODES from 'http-status-enum';
import ServiceError from './exceptions/ServiceError';

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
const JWT_NAME = `${process.env.REACT_APP_JWT_NAME}`;


/* ****************************************** SERVICIOS ***************************************** */
/**
 * Realiza peticiones a un endpoint concreto del backend y gestiona las respuestas y errores.
 * Adicionalmente se le pueden pasar parámetros.
 * 
 * Por ejemplo parameters = {method = 'POST', body = content} significa que se realizará una petición
 * POST a _endpoint_  y que el cuerpo del mensaje será el objeto _content_ .
 * @param {String} endpoint - Endpoint al que realizar la petición
 * @param {Object} parameters - Parámetros que necesita la petición
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de respuesta exitosa
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error en la respuesta
 */
export const backendFetch = (endpoint, parameters,  onSuccessCallback, onErrorCallback) => {
  let resource = BACKEND_URL + endpoint;
  const response = fetch(resource, parameters);
  response.then( (results) => handleResponse(results, onSuccessCallback, onErrorCallback))
    .catch(onServiceErrorCallback);
};

/**
 * Configura la petición que se realizará al backend.
 * @param {*} method - Tipo de petición HTTP: {GET, POST, PUT, etc}
 * @param {*} body - Contenido a enviar en el cuerpo de la petición
 * @returns {Object} - Configuración para realizar la petición
 */
export const configFetchParameters = (method, body) => {
  const config = {};

  if (method)
    config.method = method;                 // Tipo de petición

  if (body) {
    if (body instanceof FormData)           // Si el contenido son datos de un formulario, se envían sin alterar
      config.body = body;
    else {                                  // Sino, el contenido a enviar es un JSON
      config.headers = {
        'Content-Type': 'application/json',
      };
      config.body = JSON.stringify(body);
    }
  }

  // Obtiene la identificación del usuario y la agrega a las cabeceras
  let userToken = getUserJWT();
  if (userToken) {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${userToken}`;
    } else {
      config.headers = {
        'Authorization' : `Bearer ${userToken}`,
      };
    }
  }

  return config;
};

/**
 * Obtiene el Json Web Token del navegador.
 */
export const getUserJWT = () => sessionStorage.getItem(JWT_NAME);

/**
 * Almacena en el navegador el Json Web Token recibido.
 * @param {String} token - JWT recibido
 */
export const setUserJWT = (token) => sessionStorage.setItem(JWT_NAME, token);

/**
 * Elimina del navegador el Json Web Token almacenado.
 */
export const removeUserJWT = () => sessionStorage.removeItem(JWT_NAME);


/* ****************************************** HANDLERS ****************************************** */

let onServiceErrorCallback;                  // Función a ejecutar cuando se produzca un error en el backend
let onUnauthorizedErrorCallback;             // Función a ejecutar cuando se produzca un error 401: UNAUTHORIZED

/**
 * Función que maneja la respuesta _response_ recibida del backend.
 * @param {Response} response - Respuesta recibida
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de respuesta exitosa
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error en la respuesta
 * @throws {ServiceError} - Error al recibir respuesta del backend
 */
const handleResponse = (response, onSuccessCallback, onErrorCallback) => {
  if (handleOkResponse(response, onSuccessCallback))
    return;

  if (handle4XXResponse(response, onErrorCallback))
    return;

  throw new ServiceError(response.statusText);
};


/**
 * Función que gestiona una respuesta correcta del backend.
 * @param {Response} response - Respuesta recibida
 * @param {Function} onSuccessCallback - Función a ejecutar en caso de respuesta exitosa
 * @returns 
 */
const handleOkResponse = (response, onSuccessCallback) => {
  // Si respuesta es nula o no es correcta, no se puede gestionar en este método
  if (!response || !response.ok) return false;

  // Si no se recibe ningún callback, no se ejecutará nada
  if (!onSuccessCallback) return true;

  // Si la respuesta no tiene ningún contenido, se ejecuta el callback
  if (response.status === HTTP_STATUS_CODES.NO_CONTENT) {
    onSuccessCallback();
    return true;
  }

  // Si la respuesta contiene algún JSON, se procesa en el callback
  if (isJsonResponse(response)) {
    response.json()
      .then( (data) => onSuccessCallback(data));
  }

  return true;
};


/**
 * Función que gestiona los errores en las respuestas del backend.
 * @param {Response} response - Respuesta recibida
 * @param {Function} onErrorCallback - Función a ejecutar en caso de error en la respuesta
 */
const handle4XXResponse = (response, onErrorCallback) => {
  // Comprobar si el error es ajeno al servidor (no son errores del tipo 4xx)
  if (response.status < 400 || response.status >= 500)
    return false;

  // Si el error es por falta de autorización y existe una función para gestionarlo, se ejecuta
  if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED || onUnauthorizedErrorCallback) {
    onUnauthorizedErrorCallback();
    return true;
  }

  // Comprobar si la respuesta contiene información para procesarla
  if (!isJsonResponse(response))
  throw new ServiceError('La respuesta no contiene ningún detalle');

  // Si se recibe una función para gestionar los errores, se le pasa el contenido de la respuesta y se ejecuta
  if (onErrorCallback)
    response.json()
      .then( (content) => {       // Respuesta de tipo ErrorDto
        if (content.error || content.fieldErrors)
          onErrorCallback(content);
      });

  return true;
};

/**
 * Asigna una función a ejecutar en caso de que se produzcan errores de conexión con el backend.
 * @param {Function} callback - Función a ejecutar en caso de error de conexión
 */
export const init = (callback) => {onServiceErrorCallback = callback};


/**
 * Asigna una función a ejecutar en caso de no estar autorizados a realizar una petición
 * @param {Function} callback - Función a ejecutar en caso de error 401: UNAUTHORIZED
 */
export const setOnUnauthorizedErrorCallback = (callback) => {onUnauthorizedErrorCallback = callback;};
/* ************************************ FUNCIONES AUXILIARES ************************************ */
/**
 * Comprueba en las cabeceras de la respuesta si existe contenido y es un JSON
 * @param {Response} response - Contenido de la respuesta
 * @returns {Boolean} Respuesta contiene un objeto JSON
 */
const isJsonResponse = (response) => {
  const contentTypeHeader = response.headers.get('content-type');
  let isJsonType = contentTypeHeader.includes('application/json');

  return contentTypeHeader && isJsonType;
};
