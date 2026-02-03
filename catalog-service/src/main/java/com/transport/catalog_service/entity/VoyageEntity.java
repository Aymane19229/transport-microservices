package com.transport.catalog_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "voyage")
public class VoyageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateDepart;
    private int prix;
    private int placesDisponibles;

    // --- RELATIONS IMPORTANTES ---

    @ManyToOne
    @JoinColumn(name = "bus_id")
    private BusEntity bus;

    @ManyToOne
    @JoinColumn(name = "trajet_id")
    private TrajetEntity trajet;

    // Constructeur vide (Obligatoire pour JPA)
    public VoyageEntity() {
    }

    // Constructeur complet
    public VoyageEntity(int placesDisponibles, int prix, LocalDateTime dateDepart, BusEntity bus, TrajetEntity trajet) {
        this.placesDisponibles = placesDisponibles;
        this.prix = prix;
        this.dateDepart = dateDepart;
        this.bus = bus;
        this.trajet = trajet;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDateDepart() { return dateDepart; }
    public void setDateDepart(LocalDateTime dateDepart) { this.dateDepart = dateDepart; }

    public int getPrix() { return prix; }
    public void setPrix(int prix) { this.prix = prix; }

    public int getPlacesDisponibles() { return placesDisponibles; }
    public void setPlacesDisponibles(int placesDisponibles) { this.placesDisponibles = placesDisponibles; }

    public BusEntity getBus() { return bus; }
    public void setBus(BusEntity bus) { this.bus = bus; }

    public TrajetEntity getTrajet() { return trajet; }
    public void setTrajet(TrajetEntity trajet) { this.trajet = trajet; }
}