package com.transport.booking_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
public class BookingEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long passengerId;
    private Long voyageId;
    private LocalDateTime dateReservation = LocalDateTime.now();

    // 👇 Champ Statut Ajouté
    private String statut = "CONFIRME";

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getPassengerId() { return passengerId; }
    public void setPassengerId(Long passengerId) { this.passengerId = passengerId; }
    public Long getVoyageId() { return voyageId; }
    public void setVoyageId(Long voyageId) { this.voyageId = voyageId; }
    public LocalDateTime getDateReservation() { return dateReservation; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
}