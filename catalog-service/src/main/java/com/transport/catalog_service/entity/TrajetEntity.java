package com.transport.catalog_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "trajet")
public class TrajetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String villeDepart;
    private String villeArrivee;
    private int dureeMinutes;

    // Constructeur vide (Obligatoire JPA)
    public TrajetEntity() {
    }

    // Constructeur complet
    public TrajetEntity(String villeDepart, String villeArrivee, int dureeMinutes) {
        this.villeDepart = villeDepart;
        this.villeArrivee = villeArrivee;
        this.dureeMinutes = dureeMinutes;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getVilleDepart() { return villeDepart; }
    public void setVilleDepart(String villeDepart) { this.villeDepart = villeDepart; }

    public String getVilleArrivee() { return villeArrivee; }
    public void setVilleArrivee(String villeArrivee) { this.villeArrivee = villeArrivee; }

    public int getDureeMinutes() { return dureeMinutes; }
    public void setDureeMinutes(int dureeMinutes) { this.dureeMinutes = dureeMinutes; }
}