package com.commitguy.backend.rest.controllers;

import com.commitguy.backend.model.exceptions.common.PermissionException;
import com.commitguy.backend.rest.dtos.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Gestiona las excepciones más comunes que puedan ocurrir durante la ejecución de la aplicación.
 * Por ejemplo: problemas con los permisos de acceso, elementos que no se encuentran, etc.
 */
@ControllerAdvice
public class CommonControllerAdvice {

    /* ***************************** EXCEPTION HANDLERS ***************************** */
    @ExceptionHandler(value = PermissionException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorDto handlePermissionException(PermissionException exc) {
        return new ErrorDto(exc.getMessage());
    }

    /* ***************************** AUXILIAR METHODS ***************************** */

}
