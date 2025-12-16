package com.transport.geolocation_service.service;

import com.transport.geolocation_service.entity.PositionEntity;
import com.transport.geolocation_service.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PositionService {

    private final PositionRepository repository;

    // Injection par constructeur (recommandé)
    public PositionService(PositionRepository repository) {
        this.repository = repository;
    }

    // Enregistrer une position
    public PositionEntity updatePosition(Long busId, Double lat, Double lon) {
        // On utilise le constructeur avec arguments créé plus haut
        PositionEntity pos = new PositionEntity(busId, lat, lon, LocalDateTime.now());
        return repository.save(pos);
    }

    // Lire l'historique
    public List<PositionEntity> getHistoriqueBus(Long busId) {
        return repository.findByBusId(busId);
    }
}