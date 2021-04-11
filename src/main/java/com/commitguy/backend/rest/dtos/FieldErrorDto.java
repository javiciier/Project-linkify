package com.commitguy.backend.rest.dtos;

public class FieldErrorDto {
    private String fieldName;
    private String message;

    public FieldErrorDto(String fieldName, String errorMessage) {
        this.fieldName = fieldName;
        this.message = errorMessage;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getErrorMessage() {
        return message;
    }

    public void setErrorMessage(String errorMessage) {
        this.message = errorMessage;
    }
}
