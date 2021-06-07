import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {ServiceError} from '../../../backend';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


/* ************************************ ESTILOS (CSS) ************************************ */
// const useStyles = makeStyles( () => ({

// }));


/* ************************************ COMPONENTE ************************************ */
/**
 * Diálogo para mostrar errores importantes que necesitan interacción con el usuario
 */
const ErrorDialog = ({error, onCloseCallback}) => {
    const [shouldOpen, setOpen] = useState(false);
    
    /* *********************************** FUNCIONES ************************************ */    
    const handleCloseDialog = () => {
        setOpen(false);
        onCloseCallback();
    }

    /************************************ COMPONENTE *************************************/
    if (error == null) return null;

    const message = (error instanceof ServiceError) ?
        `${ServiceError.name}`
        : error.message;
    
    return (
        <Dialog 
            open={shouldOpen}
            onClose={handleCloseDialog}
        >
            <DialogTitle>
                {typeof(error)}
            </DialogTitle>

            <DialogContent>
                <Typography gutterBottom>
                    <p>{message}</p>
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
    onCloseCallback: PropTypes.func.isRequired
}

export default ErrorDialog;
