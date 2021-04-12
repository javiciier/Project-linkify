package com.commitguy.backend.rest.jwt;

/**
 * Datos que se enviarán dentro del Json Web Token para la persistencia de sesión del usuario en el navegador.
 */
public class JwtInfo {
    private Long userId;

    public JwtInfo(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
