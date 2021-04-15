package com.commitguy.backend.rest.jwt;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/* www.freecodecamp.org/news/how-to-setup-jwt-authorization-and-authentication-in-spring */
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    private JwtGenerator jwtGenerator;

    public JwtAuthenticationFilter(AuthenticationManager authManager, JwtGenerator jwtGenerator) {
        super(authManager);
        this.jwtGenerator = jwtGenerator;
    }

    @Override
    /* Obtiene el JWT de la cabecera HTTP AUTHORIZATION y se lo comunica a Spring para que configure el contexto del usuario */
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        // Comprueba si se ha recibido el JWT en la cabecera de la petición
        String authHeader = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        // Al obtener el JWT, extrae sus atributos y se los comunica a Spring
        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(req);    // Obtiene los datos de acceso
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);           // COnfigura Spring con los datos recibidos

        chain.doFilter(req, res);
    }


    /**
     * Extrae los datos de acceso del JWT
     * @param req Petición HTTP recibida
     */
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req) {
        // Elimina el "Bearer " de la cabecera
        String authHeader = req.getHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeader.replace("Bearer ", "");

        // Extraer los datos del token
        if (token != null) {
            JwtInfo data = jwtGenerator.getInfoFromToken(token);

            // Si se obtienen los datos, se registran
            if (data != null) {
                req.setAttribute("userToken", token);
                req.setAttribute("userId", data.getUserId());
                Set<GrantedAuthority> authorities = new HashSet<>();

                return new UsernamePasswordAuthenticationToken(data,null, authorities);
            } else
                return null;
        }

        return null;
    }
}
