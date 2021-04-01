package com.commitguy.backend.model.exceptions;

public class NonExistentUserAccountException extends Exception {
    public NonExistentUserAccountException() {
        super();
    }

    public NonExistentUserAccountException(String message) {
        super(message);
    }
}
