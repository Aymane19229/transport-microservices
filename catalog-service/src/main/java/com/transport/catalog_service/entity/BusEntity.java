package com.transport.catalog_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bus")

public class BusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)

    private String matricule;

    private int capacite;

    private String etat;

    public BusEntity() {
    }

    public BusEntity(String matricule, int capacite, String etat) {
        this.matricule = matricule;
        this.capacite = capacite;
        this.etat = etat;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public int getCapacite() {
        return capacite;
    }

    public void setCapacite(int capacite) {
        this.capacite = capacite;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }
}