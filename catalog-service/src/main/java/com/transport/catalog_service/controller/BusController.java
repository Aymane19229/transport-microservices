package com.transport.catalog_service.controller;

import com.transport.catalog_service.entity.BusEntity;
import com.transport.catalog_service.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bus")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping
    public List<BusEntity> getAllBus() {
        return busService.getAllBus();
    }

    @PostMapping
    public BusEntity ajouterBus(@RequestBody BusEntity bus) {
        return busService.ajouterBus(bus);
    }

    @GetMapping("/{id}")
    public BusEntity getBusById(@PathVariable Long id) {
        return busService.getBusById(id);
    }

    // 👇 NOUVEAU
    @DeleteMapping("/{id}")
    public void deleteBus(@PathVariable Long id) {
        busService.deleteBus(id);
    }
}