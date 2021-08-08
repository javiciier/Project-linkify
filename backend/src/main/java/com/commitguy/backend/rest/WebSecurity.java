package com.commitguy.backend.rest;

import com.commitguy.backend.rest.jwt.JwtAuthenticationFilter;
import com.commitguy.backend.rest.jwt.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/* www.freecodecamp.org/news/how-to-setup-jwt-authorization-and-authentication-in-spring */
@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtGenerator jwtGenerator;

    @Override
    /* Configura qué endpoints son accesibles y qué metodos HTTP pueden acceder a ellos */
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        JwtAuthenticationFilter authenticationFilter = new JwtAuthenticationFilter(authenticationManager(), jwtGenerator);

        httpSecurity.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(authenticationFilter).authorizeRequests()
                // User controller endpoints
                .antMatchers(HttpMethod.POST, "/users/login").permitAll()
                .antMatchers(HttpMethod.POST, "/users/loginUsingToken").permitAll()
                .antMatchers(HttpMethod.POST, "/users/signUp").permitAll()
                .antMatchers(HttpMethod.POST, "/users/{userId}/changePassword").permitAll()
                .antMatchers(HttpMethod.POST, "/users/{userId}/updateProfile").permitAll()
                .antMatchers(HttpMethod.GET, "/users/{userId}/avatar").permitAll()
                .antMatchers(HttpMethod.POST, "/users/{userId}/avatar").permitAll()
                .anyRequest().denyAll();

    }

    @Bean
    /* Configuración de seguridad para permitir peticiones CORS */
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        UrlBasedCorsConfigurationSource corsUrlSource = new UrlBasedCorsConfigurationSource();

        //corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedOrigin("*");           // Permite peticiones desde cualquier URL
        corsConfig.addAllowedHeader("*");           // Acepta todas las cabeceras
        corsConfig.addAllowedMethod("*");           // Acepta todos los métodos HTTP

        // Aplica la configuración anterior a todas las URL que coincidan con el patrón anterior
        corsUrlSource.registerCorsConfiguration("/**", corsConfig);

        return corsUrlSource;

    }

}
