package com.commitguy.backend.rest.dtos.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserDto {
    private Long id;
    private String name;
    private String surname1;
    private String surname2;
    private String password;
    private String nickName;
    private String email;
    private String avatar;

    public UserDto() {}

    public UserDto(Long id, String name, String surname1, String surname2, String password, String nickName, String email, String avatar) {
        this.id = id;
        this.name = name;
        this.surname1 = surname1;
        this.surname2 = surname2;
        this.password = password;
        this.nickName = nickName;
        this.email = email;
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull
    @Size(min = 1, max = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull
    @Size(min = 1, max = 50)
    public String getSurname1() {
        return surname1;
    }

    public void setSurname1(String surname1) {
        this.surname1 = surname1;
    }

    public String getSurname2() {
        return surname2;
    }

    public void setSurname2(String surname2) {
        this.surname2 = surname2;
    }

    @NotNull
    @Size(min = 1, max = 50)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotNull
    @Size(min = 1, max = 50)
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    @NotNull
    @Size(min = 1, max = 60)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

}
