import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {ServiceError} from '../../../backend';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import app from '../../app';

/* ************************************ ESTILOS (CSS) ************************************ */
// const useStyles = makeStyles( () => ({

// }));


/* ************************************ COMPONENTE ************************************ */
/**
 * Diálogo para mostrar errores importantes que necesitan interacción con el usuario
 */
const ErrorDialog = ({error, onCloseCallback, show}) => {
    const [shouldOpen, setOpen] = useState(show);
    
    /* *********************************** FUNCIONES ************************************ */    
    const handleCloseDialog = () => {
        setOpen(false);
        onCloseCallback();
    }

    /************************************ COMPONENTE *************************************/
    if (error == null) return null;

    const {errorName, details} = error;

    return (
        <Dialog
            open={shouldOpen}
            onClose={handleCloseDialog}
        >
            <DialogTitle>
                {errorName}
            </DialogTitle>

            <DialogContent>
                <Typography gutterBottom>
                    {details}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleCloseDialog}
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}


ErrorDialog.propTypes = {
    error: PropTypes.object, 
    onCloseCallback: PropTypes.func.isRequired,
    show: PropTypes.bool
}

export default ErrorDialog;
