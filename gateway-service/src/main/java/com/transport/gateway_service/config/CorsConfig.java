package com.transport.gateway_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        // 1. Autoriser ton Frontend React
        corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));

        // 2. Autoriser toutes les méthodes (GET, POST, OPTIONS, etc.)
        corsConfig.setMaxAge(3600L); // Cache de 1h pour éviter de redemander tout le temps
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));

        // 3. Autoriser tous les headers (Authorization, Content-Type...)
        corsConfig.addAllowedHeader("*");

        // 4. Autoriser les cookies/credentials
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}