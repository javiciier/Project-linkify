package com.commitguy.backend.rest.dtos;

import java.util.List;

public class ErrorDto {
    private String error;
    private List<FieldErrorDto> fieldErrors;


    public ErrorDto(String error) {
        this.error = error;
    }
    public ErrorDto(List<FieldErrorDto> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }


    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<FieldErrorDto> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(List<FieldErrorDto> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
}
