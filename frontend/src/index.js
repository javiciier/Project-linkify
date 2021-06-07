/* Librerías */
import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';


/* Servicios */
import {Provider} from 'react-redux';
import configureStore from './redux';
import backend from './backend';
import app from './modules/app';
import {ServiceError} from './backend';


/* Componentes */
import {App} from './modules/app';



// Configurar store de redux
const store = configureStore();

// Configurar conexión con backend
backend.init( (err) =>
    store.dispatch(app.actions.error(new ServiceError(err.message)))
);


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

