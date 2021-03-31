package com.commitguy.backend.exceptions;

public class NonExistentUserAccountException extends Exception {
    public NonExistentUserAccountException() {
        super();
    }

    public NonExistentUserAccountException(String message) {
        super(message);
    }
}
