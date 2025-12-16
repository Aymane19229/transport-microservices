package com.transport.user_service.controller;

import com.transport.user_service.entity.Utilisateur;
import com.transport.user_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody Utilisateur utilisateur) {
        return authService.registerUser(utilisateur);
    }

    // --- NOUVEAU ENDPOINT ---
    @PostMapping("/login")
    public String login(@RequestBody Utilisateur utilisateur) {
        // On attend un JSON avec juste "username" et "password"
        return authService.login(utilisateur.getUsername(), utilisateur.getPassword());
    }
}