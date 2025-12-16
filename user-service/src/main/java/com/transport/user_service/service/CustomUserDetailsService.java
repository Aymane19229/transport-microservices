package com.transport.user_service.service;

import com.transport.user_service.entity.Utilisateur;
import com.transport.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. On cherche l'utilisateur dans la BDD
        Utilisateur utilisateur = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable avec le nom : " + username));

        // 2. On le convertit en "User" de Spring Security
        return new User(
                utilisateur.getUsername(),
                utilisateur.getPassword(),
                // Ici on transforme notre String "ROLE_PASSAGER" en Autorité Spring
                Collections.singletonList(new SimpleGrantedAuthority(utilisateur.getRole()))
        );
    }
}