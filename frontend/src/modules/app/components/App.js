import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';


import users from '../../users';

/* Componentes */
import Header from './Header';
import Body from './Body';




/**
 * Single Page Application (SPA) visible por el usuario.
*/
const App = () => {
    const dispatch = useDispatch();

    /* ************************************ FUNCIONES ************************************ */
    useEffect(() => {
        /** Acción a ejecutar si el usuario no está autorizado para iniciar sesión con el JWT */
        let onUnauthorized = () => dispatch(users.actions.logout());

        /* ACCIONES A EJECUTAR INMEDIATAMENTE AL CARGAR LA APLICACIÓN*/
        dispatch(users.actions.loginFromToken(onUnauthorized))
    } );


    /* *********************************** COMPONENTE ************************************ */
    return (
        <div className={App.name}>
            <Router>
                <Header/>
                <Body/>
            </Router>
        </div>
    );
}


export default App;
