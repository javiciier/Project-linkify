package com.commitguy.backend.model.entities;

import javax.persistence.*;

@Entity
public class UserAccount {
    private Long accountId;
    private String nickName;
    private String password;
    private User user;          /* Clave foránea a entidad User */

    public UserAccount() {};

    public UserAccount(String nickName, String password) {
        this.nickName = nickName;
        this.password = password;
    }

    /* Propiedades de la entidad: atributos con sus métodos getter y setter */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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

    @OneToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "user")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    /* Métodos de negocio (patrón Domain Model) */
}
