package com.transport.catalog_service.controller;

import com.transport.catalog_service.entity.VoyageEntity;
import com.transport.catalog_service.service.VoyageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voyages")
@CrossOrigin("*")
public class VoyageController {

    @Autowired
    private VoyageService voyageService;

    // 1. Récupérer tous les voyages
    @GetMapping
    public List<VoyageEntity> getAllVoyages() {
        return voyageService.getAllVoyages();
    }

    // 👇 C'EST CETTE MÉTHODE QUI MANQUAIT ! 👇
    @GetMapping("/{id}")
    public VoyageEntity getVoyageById(@PathVariable Long id) {
        return voyageService.getVoyageById(id);
    }
    // 👆 Elle permet de répondre à /api/voyages/1

    // 3. Chercher par ville
    @GetMapping("/search")
    public List<VoyageEntity> searchVoyages(@RequestParam String depart, @RequestParam String arrivee) {
        return voyageService.chercherVoyages(depart, arrivee);
    }

    // 4. Créer un voyage
    @PostMapping
    public VoyageEntity planifierVoyage(@RequestBody VoyageEntity voyage) {
        return voyageService.planifierVoyage(voyage);
    }
}