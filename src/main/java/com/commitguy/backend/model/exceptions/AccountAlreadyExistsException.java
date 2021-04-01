package com.commitguy.backend.model.exceptions;

public class AccountAlreadyExistsException extends Exception{
    public AccountAlreadyExistsException() {
        super();
    }

    public AccountAlreadyExistsException(String message) {
        super(message);
    }
}
