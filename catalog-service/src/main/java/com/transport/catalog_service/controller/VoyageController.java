package com.transport.catalog_service.controller;

import com.transport.catalog_service.entity.VoyageEntity;
import com.transport.catalog_service.service.VoyageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/voyages")
public class VoyageController {

    @Autowired private VoyageService voyageService;

    @GetMapping
    public List<VoyageEntity> getAll() { return voyageService.getAllVoyages(); }

    @GetMapping("/{id}")
    public VoyageEntity getById(@PathVariable Long id) { return voyageService.getVoyageById(id); }

    @PostMapping
    public VoyageEntity create(@RequestBody VoyageEntity v) { return voyageService.planifierVoyage(v); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { voyageService.deleteVoyage(id); }

    // Appelé lors d'une réservation
    @PutMapping("/{id}/reserver")
    public void reserver(@PathVariable Long id) { voyageService.decrementerPlaces(id); }

    // 👇 Appelé lors d'une annulation
    @PutMapping("/{id}/liberer")
    public void liberer(@PathVariable Long id) { voyageService.incrementerPlaces(id); }
}