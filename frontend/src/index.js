/* Librerías */
import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';


/* Servicios */
import {Provider} from 'react-redux';
import configureStore from './redux';
import backend from './backend';
import {ServiceError} from './backend';
import app from './modules/app';
import users from './modules/users';


/* Componentes */
import {App} from './modules/app';



// Configurar store de redux
const store = configureStore();

// Configurar conexión con backend
backend.setDefaultServiceError( () =>
    store.dispatch(app.actions.error(new ServiceError('No se puede conectar con el backend')))
);


const main = () => {
    store.dispatch(users.actions.loginFromToken());

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
}

main();
