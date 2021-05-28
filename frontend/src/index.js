/* Librerías */
import React from 'react';
import ReactDOM from 'react-dom';

/* Servicios */
import configureStore from './redux';
import backend from './backend';
import app from './modules/app';
import {ServiceError} from './backend/exceptions';


/* Componentes */
import {App} from './modules/app';





// Configurar store de redux
const store = configureStore();

// Configurar conexión con backend



ReactDOM.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
    document.getElementById('root')
);

