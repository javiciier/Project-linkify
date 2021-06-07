import React from 'react';
import PropTypes from 'prop-types';

import { Alert, AlertTitle } from '@material-ui/lab';

/* ************************************ ESTILOS (CSS) ************************************ */

/* ************************************* COMPONENTE ************************************* */
/**
 * Alerta de error
*/
const ErrorAlert = ({errors, onCloseCallback}) => {
    if (!errors) return null;

    let error, fieldErrors;             // Campos de ErrorDto

    if (errors.error) {
        error = errors.error;
    } else if (errors.fieldErrors) {
        fieldErrors = [];
        errors.fieldErrors.forEach( (e) => {
            let field = e.fieldName;
            let message = e.message;
            fieldErrors.push(`${field} : ${message}`);
        })
    }


    return (
        <Alert
            severity="error"
            onClose={onCloseCallback}
            color="error"
            className={ErrorAlert.name}
        >
            <AlertTitle>
                {(error) ? error: 'Error'}
            </AlertTitle>

            { (fieldErrors) ?
                <ul>
                    {fieldErrors.map( (field, i) => <li key={i}>{field}</li>)}
                </ul>
                : ''
            }
        </Alert>
    )

}


ErrorAlert.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onCloseCallback: PropTypes.func.isRequired
};

export default ErrorAlert;
