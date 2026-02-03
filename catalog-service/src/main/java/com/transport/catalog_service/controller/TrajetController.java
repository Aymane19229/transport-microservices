package com.transport.catalog_service.controller;

import com.transport.catalog_service.entity.TrajetEntity;
import com.transport.catalog_service.service.TrajetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trajets")
public class TrajetController {

    @Autowired
    private TrajetService trajetService;

    @GetMapping
    public List<TrajetEntity> avoirTrajets() {
        return trajetService.getAllTrajet();
    }

    @PostMapping
    public TrajetEntity ajouterTrajet(@RequestBody TrajetEntity trajet) {
        return trajetService.ajouterTrajet(trajet);
    }

    // 👇 NOUVEAU
    @DeleteMapping("/{id}")
    public void deleteTrajet(@PathVariable Long id) {
        trajetService.deleteTrajet(id);
    }
}