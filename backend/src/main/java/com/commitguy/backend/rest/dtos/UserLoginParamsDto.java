package com.commitguy.backend.rest.dtos;

import com.commitguy.backend.model.entities.User;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserLoginParamsDto {
    private String nickName;
    private String password;


    public UserLoginParamsDto() {}

    public UserLoginParamsDto(String nickName, String password) {
        this.nickName = nickName;
        this.password = password;
    }


    @NotNull
    @Size(min = 1, max = 60)
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName.trim();
    }

    @NotNull
    @Size(min = 1, max = 60)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
