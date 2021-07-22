package com.commitguy.backend.model.entities;

import javax.persistence.*;
import java.util.Arrays;

/**
 * Representación del usuario en la BD.
 * LINKS:
 *  - Imágenes: https://vaadin.com/blog/saving-and-displaying-images-using-jpa
 *  - Tutorial imágenes: https://github.com/DiegoSanzVi/saving_displaying_images_db
 */
@Entity
public class User {
    private Long id;
    private String name;
    private String surname1;
    private String surname2;
    private String email;
    private String nickName;
    private String password;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String avatar;

    public User() {}

    public User(String name, String surname1, String surname2, String password, String nickName, String email, String avatar) {
        this.name = name;
        this.surname1 = surname1;
        this.surname2 = surname2;
        this.password = password;
        this.nickName = nickName;
        this.email = email;
        this.avatar = avatar;
    }

    /* Propiedades de la entidad: atributos con sus métodos getter y setter */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "USER: "
                + "id: " + this.id + " "
                + "name: " + this.name + " "
                + "surname1: " + this.surname1 + " "
                + "surname2: " + this.surname2 + " "
                + "email: " + this.email + " "
                + "nickName: " + this.nickName + " "
                + "password: " + this.password
                + "avatar: " + this.avatar;
    }
}
