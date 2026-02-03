package com.transport.user_service.controller;

import com.transport.user_service.entity.Utilisateur;
import com.transport.user_service.service.AuthService;
import com.transport.user_service.repository.UserRepository; // 👈 Import nécessaire
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap; // 👈 Import nécessaire
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService authService;
    @Autowired private UserRepository userRepository; // 👈 AJOUT

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Utilisateur utilisateur) {
        // 1. Authentification (Vérif mot de passe)
        String token = authService.login(utilisateur.getUsername(), utilisateur.getPassword());

        // 2. Récupération des infos (Pour le Frontend)
        Utilisateur user = userRepository.findByUsername(utilisateur.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        // 3. Construction de la réponse JSON complète
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("userId", user.getId()); // 👈 C'est ça qui manquait !

        return response;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Utilisateur utilisateur) {
        String message = authService.registerUser(utilisateur);
        return Collections.singletonMap("message", message);
    }
}