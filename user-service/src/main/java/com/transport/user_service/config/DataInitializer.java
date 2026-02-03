package com.transport.user_service.config;

import com.transport.user_service.entity.Utilisateur;
import com.transport.user_service.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // On vérifie si l'admin existe déjà pour ne pas le recréer à chaque fois
            if (userRepository.findByUsername("admin").isEmpty()) {
                Utilisateur admin = new Utilisateur();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123")); // Mot de passe : admin123
                admin.setEmail("admin@smart-transport.com");
                admin.setNom("System");
                admin.setPrenom("Administrator");
                admin.setRole("ADMIN"); // 👈 Le Rôle Magique

                userRepository.save(admin);
                System.out.println("👑 COMPTE ADMIN CRÉÉ : Login 'admin' / Pass 'admin123'");
            }
        };
    }
}