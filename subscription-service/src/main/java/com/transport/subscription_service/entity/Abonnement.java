package com.transport.subscription_service.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Abonnement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;        // L'ID du passager
    private String type;        // "MENSUEL" ou "ANNUEL"
    private LocalDate dateFin;  // Date d'expiration
    private Double prix;

    public Abonnement() {} // Constructeur vide obligatoire

    public Abonnement(Long userId, String type, LocalDate dateFin, Double prix) {
        this.userId = userId;
        this.type = type;
        this.dateFin = dateFin;
        this.prix = prix;
    }

    // Getters
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getType() { return type; }
    public LocalDate getDateFin() { return dateFin; }
    public Double getPrix() { return prix; }
}