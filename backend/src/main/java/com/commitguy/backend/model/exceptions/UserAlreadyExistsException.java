package com.commitguy.backend.model.exceptions;

public class UserAlreadyExistsException extends Exception{
    public UserAlreadyExistsException() {
        super();
    }

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
