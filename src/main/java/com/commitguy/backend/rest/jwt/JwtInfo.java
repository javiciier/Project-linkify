package com.commitguy.backend.rest.jwt;

/**
 * Datos que se enviarán dentro del Json Web Token para la persistencia de sesión del usuario en el navegador.
 */
public class JwtInfo {
    private Long userId;
    private String nickName;

    public JwtInfo(Long userId, String nickName) {
        this.userId = userId;
        this.nickName = nickName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
}
