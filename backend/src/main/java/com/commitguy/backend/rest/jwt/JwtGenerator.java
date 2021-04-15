package com.commitguy.backend.rest.jwt;

public interface JwtGenerator {

    String generateJWT(JwtInfo info);

    JwtInfo getInfoFromToken(String token);
}
