package com.transport.user_service.service;

import com.transport.user_service.entity.Utilisateur;
import com.transport.user_service.repository.UserRepository;
import com.transport.user_service.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String registerUser(Utilisateur utilisateur) {
        if (userRepository.existsByEmail(utilisateur.getEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé !");
        }
        // Par sécurité, on peut forcer le rôle ici si besoin, mais on laisse flexible pour le test
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        userRepository.save(utilisateur);
        return "Utilisateur enregistré avec succès !";
    }

    public String login(String username, String password) {
        Optional<Utilisateur> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            Utilisateur user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                // --- MODIFICATION ICI : On envoie le rôle ---
                return jwtUtil.generateToken(username, user.getRole());
            }
        }
        throw new RuntimeException("Login ou mot de passe incorrect !");
    }
}