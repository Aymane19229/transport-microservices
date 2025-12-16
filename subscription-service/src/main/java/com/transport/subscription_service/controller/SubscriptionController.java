package com.transport.subscription_service.controller;

import com.transport.subscription_service.entity.Abonnement;
import com.transport.subscription_service.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin("*")
public class SubscriptionController {
    private final SubscriptionService service;

    public SubscriptionController(SubscriptionService service) {
        this.service = service;
    }

    // POST : Acheter un abonnement (?userId=1&type=MENSUEL)
    @PostMapping
    public Abonnement create(@RequestParam Long userId, @RequestParam String type) {
        return service.souscrire(userId, type);
    }

    // GET : Voir mes abonnements (/api/subscriptions/1)
    @GetMapping("/{userId}")
    public List<Abonnement> getByUser(@PathVariable Long userId) {
        return service.mesAbonnements(userId);
    }
}