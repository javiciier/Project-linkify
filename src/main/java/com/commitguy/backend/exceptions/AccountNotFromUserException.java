package com.commitguy.backend.exceptions;

/**
 * Exepción ejecutada cuando la cuenta de usuario no se corresponde con su usuario propietario.
 */
public class AccountNotFromUserException extends Exception {
    public AccountNotFromUserException() {
        super();
    }

    public AccountNotFromUserException(String message) {
        super(message);
    }
}
