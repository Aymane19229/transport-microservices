package com.transport.subscription_service.repository;

import com.transport.subscription_service.entity.Abonnement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AbonnementRepository extends JpaRepository<Abonnement, Long> {
    List<Abonnement> findByUserId(Long userId);
}