package com.transport.geolocation_service.repository;

import com.transport.geolocation_service.entity.PositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PositionRepository extends JpaRepository<PositionEntity, Long> {
    // Méthode personnalisée pour trouver tout l'historique d'un bus
    List<PositionEntity> findByBusId(Long busId);
}