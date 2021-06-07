import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../../app/redux/actions';
import * as selectors from '../../app/redux/selectors';

import {CircularProgress} from '@material-ui/core'
import ErrorDialog from './ErrorDialog';


const ConnectionErrorDialog = () => {
    const dispatch = useDispatch();
    const appError = useSelector(selectors.getError);

    let onClose = () => dispatch(actions.error( {} ));

    return (
        <ErrorDialog error={appError}
            onCloseCallback={onClose}
        />
    );
};


const ConnectionLoader = () => {
    const isLoading = useSelector(selectors.isLoading);

    return (
        isLoading ? 
            <CircularProgress />
            : null
    );
}

/**
 * Dialogo mostrando estado de la aplicación (cargando, error de conexión, etc)
 */
const AppStatusDialog = () => (
    <div className={AppStatusDialog.name}>
        <ConnectionErrorDialog/>
        <ConnectionLoader/>
    </div>
)

export default AppStatusDialog;
