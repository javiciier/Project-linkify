import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../../app/redux/actions';
import * as selectors from '../../app/redux/selectors';

import {CircularProgress} from '@material-ui/core'
import ErrorDialog from './ErrorDialog';

/**
 * Dialogo mostrando estado de la aplicación (cargando, error de conexión, etc)
 */
const AppStatusDialog = () => {
    const appError = useSelector(selectors.getError);
    const dispatch = useDispatch();
    
     /* ************************************ FUNCIONES ************************************ */
    const ConnectionErrorDialog = () => {
        const [showDialog, setShowDialog] = useState(true);

        let onClose = () => {
            dispatch(actions.clearError());
            setShowDialog(false);
        };

        return (
            <ErrorDialog
                className={ErrorDialog.name}
                error={appError}
                onCloseCallback={onClose}
                show={showDialog}
            />
        );
    };
            
    const ConnectionLoader = () => {
        const isLoading = useSelector(selectors.isLoading);
        
        return (
            isLoading ? 
            <CircularProgress className={CircularProgress.name}/>
            : null
        );
    }


    /* *********************************** COMPONENTE ************************************ */
    // useEffect( () => {console.log("use effect");})


    return (
        <div className={AppStatusDialog.name}>
            <ConnectionErrorDialog/>
            <ConnectionLoader/>
        </div>
    )
}

export default AppStatusDialog;
