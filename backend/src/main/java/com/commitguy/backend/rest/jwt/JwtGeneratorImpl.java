package com.commitguy.backend.rest.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtGeneratorImpl implements JwtGenerator {
    @Value("${project.jwtSession.signKey}")
    private String signKey;

    @Value("${project.jwtSession.expirationInMinutes}")
    private long expirationInMinutes;


    @Override
    public String generateJWT(JwtInfo info) {
        long expirationDateInMiliseconds = System.currentTimeMillis() + expirationInMinutes*60*1000;
        Date expirationDate = new Date(expirationDateInMiliseconds);
        String jwt = Jwts.builder()
                .claim("userId",info.getUserId())
                .claim("nickName", info.getNickName())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, signKey)
                .compact();

        return jwt;
    }

    @Override
    public JwtInfo getInfoFromToken(String token) {
        // Obtener los fragmentos (claims) del JWT
        Claims claims = Jwts.parser()
                .setSigningKey(signKey)
                .parseClaimsJws(token)
                .getBody();

        // Parsear datos
        Long userId = ((Integer) claims.get("userId")).longValue();
        String nickName = (String) claims.get("nickName");

        return new JwtInfo(userId, nickName);
    }
}
