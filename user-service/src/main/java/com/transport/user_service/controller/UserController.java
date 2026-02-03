package com.transport.user_service.controller;

import com.transport.user_service.entity.Utilisateur;
import com.transport.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET : Lister tout le monde
    @GetMapping
    public List<Utilisateur> getAllUsers() {
        return userService.getAllUsers();
    }

    // DELETE : Bannir un utilisateur
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}