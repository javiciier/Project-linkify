import 'dotenv';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import users from '../../users';

/* Componentes */
import Header from './Header';
import Body from './Body';
import app from '..';


/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        // background: 'lightblue'
    },

}));



/* ************************************ COMPONENTE ************************************ */
/**
 * Single Page Application (SPA) visible por el usuario.
*/
const App = () => {
    const styles = useStyles();
    const dispatch = useDispatch();

    /* ************************************ FUNCIONES ************************************ */
    useEffect(() => {
        /** Acción a ejecutar si el usuario no está autorizado para iniciar sesión con el JWT */
        let onUnauthorized = () => {
            dispatch(users.actions.logout());
            // dispatch(app.actions.error(
            //     new PermissionError("No existe ningun JWT").toObject())
            // )
        };

        /* ACCIONES A EJECUTAR INMEDIATAMENTE AL CARGAR LA APLICACIÓN*/
        setTimeout( () => {
            
        }, 3*1000)
            dispatch(users.actions.loginFromToken(onUnauthorized()));
            dispatch(app.actions.loaded())
    } );


    /* *********************************** COMPONENTE ************************************ */
    return (
        <div className={styles.container}>
            <Router>
                <Header/>
                <Body />
            </Router>
        </div>
    );
}


export default App;
