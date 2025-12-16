package com.transport.subscription_service.service;

import com.transport.subscription_service.entity.Abonnement;
import com.transport.subscription_service.repository.AbonnementRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class SubscriptionService {
    private final AbonnementRepository repository;

    public SubscriptionService(AbonnementRepository repository) {
        this.repository = repository;
    }

    public Abonnement souscrire(Long userId, String type) {
        LocalDate dateFin;
        Double prix;

        if ("ANNUEL".equalsIgnoreCase(type)) {
            dateFin = LocalDate.now().plusYears(1);
            prix = 3000.0;
        } else { // Par défaut MENSUEL
            dateFin = LocalDate.now().plusMonths(1);
            prix = 300.0;
        }

        return repository.save(new Abonnement(userId, type, dateFin, prix));
    }

    public List<Abonnement> mesAbonnements(Long userId) {
        return repository.findByUserId(userId);
    }
}