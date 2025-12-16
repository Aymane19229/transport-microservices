package com.transport.catalog_service.controller;

import com.transport.catalog_service.entity.BusEntity;
import com.transport.catalog_service.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Dit à Spring que c'est une API Web
@RequestMapping("/api/bus") // Toutes les adresses commenceront par /api/bus
@CrossOrigin("*") // AUTORISE REACT à parler avec ce service (Indispensable !)
public class BusController {

    @Autowired
    private BusService busService;

    // GET http://localhost:8082/api/bus
    // Pourquoi ? Pour afficher la liste des bus dans le tableau de bord Admin
    @GetMapping
    public List<BusEntity> getAllBus() {
        return busService.getAllBus();
    }

    // POST http://localhost:8082/api/bus
    // Pourquoi ? Pour enregistrer un nouveau véhicule dans la base
    @PostMapping
    public BusEntity ajouterBus(@RequestBody BusEntity bus) {
        return busService.ajouterBus(bus);
    }
}