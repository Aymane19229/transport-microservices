package com.transport.notification_service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Le canal où les passagers écoutent
        config.enableSimpleBroker("/topic");
        // Le préfixe pour les messages envoyés par le conducteur
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Point de connexion pour le Frontend (React)
        registry.addEndpoint("/ws-gps")
                .setAllowedOriginPatterns("*") // Accepte toutes les connexions
                .withSockJS(); // Active la compatibilité
    }
}