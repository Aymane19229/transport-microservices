package com.transport.subscription_service.controller;

import com.transport.subscription_service.entity.Abonnement;
import com.transport.subscription_service.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/abonnements") // 👈 CORRECTION ICI (C'était "subscriptions")
public class SubscriptionController {

    private final SubscriptionService service;

    public SubscriptionController(SubscriptionService service) {
        this.service = service;
    }

    // POST : Acheter un abonnement
    @PostMapping
    public Abonnement create(@RequestParam Long userId, @RequestParam String type) {
        return service.souscrire(userId, type);
    }

    // GET : Voir mes abonnements (/api/abonnements/user/1)
    // Note : J'ai ajouté "/user" pour être cohérent avec ton Frontend
    @GetMapping("/user/{userId}")
    public List<Abonnement> getByUser(@PathVariable Long userId) {
        return service.mesAbonnements(userId);
    }
}