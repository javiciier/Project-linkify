package com.commitguy.backend.exceptions;

/**
 * Excepción ejecutada cuando no existe el usuario
 */
public class NonExistentUserException extends Exception {
    public NonExistentUserException() {
        super();
    }

    public NonExistentUserException(String message) {
        super(message);
    }
}
