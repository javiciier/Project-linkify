package com.commitguy.backend.model.exceptions;

public class IncorrectLoginException extends Exception {
    public IncorrectLoginException() {
        super();
    }

    public IncorrectLoginException(String message) {
        super(message);
    }
}
