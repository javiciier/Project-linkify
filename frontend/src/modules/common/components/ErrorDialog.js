import React from 'react';
import PropTypes from 'prop-types';
import {ServiceError} from '../../../backend';

import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Button} from 'reactstrap';



const ErrorDialog = ({error, onCloseCallback}) => {
    if (error == null) return null;

    const message = (error instanceof ServiceError) ? `${ServiceError.name}` : error.message;

    /************************************ COMPONENTE *************************************/
    return (
        <Modal animation={true}>
                <ModalHeader>Error</ModalHeader>

                <ModalBody>
                    <p>{message}</p>
                </ModalBody>

                <ModalFooter>
                    <Button variant="primary" onClick={onCloseCallback}>
                        Cerrar
                    </Button>
                </ModalFooter>

        </Modal>
    )
}


ErrorDialog.propTypes = {
    error: PropTypes.object,
    onCloseCallback: PropTypes.func.isRequired
}

export default ErrorDialog;
