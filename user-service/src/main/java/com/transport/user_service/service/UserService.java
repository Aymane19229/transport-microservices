package com.transport.user_service.service;

import com.transport.user_service.entity.Utilisateur;
import com.transport.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<Utilisateur> getAllUsers() {
        return userRepository.findAll();
    }

    public Utilisateur getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User introuvable"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}