import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router';

import * as actions from '../redux/actions';
import app from '../../app';

import { ErrorAlert } from '../../common';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';

/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    component: {},
    container: {},
    card: {},
    form: {},
    button: {},
}))

/* ************************************* COMPONENTE ************************************* */
/**
 * Formulario para registrar una nueva cuenta
 */
const Signup = () => {
    const styles = useStyles();
    const [backendErrors, setBackendErrors] = useState(null);
    
    /* ************************************ FUNCIONES ************************************ */

    /* ************************************ COMPONENTE ************************************ */
    return (
        <div className={styles.component}>
            <ErrorAlert
                errors={backendErrors}
                onCloseCallback={() => setBackendErrors(null)}
            />

            <Container className={styles.container}>
                
            </Container>
        </div>
    )
}

export default Signup;
