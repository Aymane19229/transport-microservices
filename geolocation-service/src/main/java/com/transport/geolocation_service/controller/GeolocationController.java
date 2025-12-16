package com.transport.geolocation_service.controller;

import com.transport.geolocation_service.entity.PositionEntity;
import com.transport.geolocation_service.service.PositionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/geolocation")
@CrossOrigin("*") // Autorise le Frontend à appeler ce service
public class GeolocationController {

    private final PositionService service;

    public GeolocationController(PositionService service) {
        this.service = service;
    }

    // POST : Le bus envoie sa position (ex: ?busId=1&lat=34.5&lon=-6.8)
    @PostMapping
    public PositionEntity update(@RequestParam Long busId, @RequestParam Double lat, @RequestParam Double lon) {
        return service.updatePosition(busId, lat, lon);
    }

    // GET : Suivre le bus 1 (ex: /api/geolocation/1)
    @GetMapping("/{busId}")
    public List<PositionEntity> suivreBus(@PathVariable Long busId) {
        return service.getHistoriqueBus(busId);
    }
}