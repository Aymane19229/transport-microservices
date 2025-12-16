package com.transport.catalog_service.controller;

import com.transport.catalog_service.entity.TrajetEntity;
import com.transport.catalog_service.service.TrajetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trajets")
@CrossOrigin("*")
public class TrajetController {

    @Autowired
    private TrajetService trajetService;

    // GET http://localhost:8082/api/trajets
    // Pourquoi ? Pour voir toutes les lignes existantes
    @GetMapping
    public List<TrajetEntity>  avoirTrajets() {
        return trajetService.getAllTrajet();
    }

    // Pourquoi ? Pour créer une nouvelle ligne
    @PostMapping
    public TrajetEntity ajouterTrajet(@RequestBody TrajetEntity trajet) {
        return trajetService.ajouterTrajet(trajet);
    }
}