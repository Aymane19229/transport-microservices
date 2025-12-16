package com.transport.user_service.repository;

import com.transport.user_service.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Utilisateur, Long> {

    // SELECT * FROM users WHERE username = ?
    Optional<Utilisateur> findByUsername(String username);

    // SELECT count(*) > 0 FROM users WHERE email = ?
    Boolean existsByEmail(String email);
}