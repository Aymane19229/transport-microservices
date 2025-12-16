package com.transport.booking_service.service;

import com.transport.booking_service.client.CatalogClient;
import com.transport.booking_service.dto.VoyageDTO;
import com.transport.booking_service.entity.ReservationEntity;
import com.transport.booking_service.repository.ReservationRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BookingService {

    private final ReservationRepository reservationRepository;
    private final CatalogClient catalogClient;
    private final RabbitTemplate rabbitTemplate;

    public BookingService(ReservationRepository reservationRepository, CatalogClient catalogClient, RabbitTemplate rabbitTemplate) {
        this.reservationRepository = reservationRepository;
        this.catalogClient = catalogClient;
        this.rabbitTemplate = rabbitTemplate;
    }

    // Méthode 1 : Créer une réservation (Existante)
    public ReservationEntity reserverVoyage(Long passengerId, Long voyageId) {
        // 1. Vérification auprès du Catalog-Service
        VoyageDTO voyage = catalogClient.getVoyageById(voyageId);

        if (voyage == null) {
            throw new RuntimeException("Erreur : Le voyage " + voyageId + " n'existe pas !");
        }
        if (voyage.getPlacesDisponibles() <= 0) {
            throw new RuntimeException("Erreur : Le voyage est complet !");
        }

        // 2. Création de la réservation
        ReservationEntity reservation = new ReservationEntity();
        reservation.setPassengerId(passengerId);
        reservation.setVoyageId(voyageId);
        reservation.setDateReservation(LocalDateTime.now());
        reservation.setStatut("CONFIRME");

        ReservationEntity savedReservation = reservationRepository.save(reservation);

        // 3. Notification RabbitMQ
        String message = "Confirmation : Réservation #" + savedReservation.getId() + " validée pour le Passager " + passengerId;
        rabbitTemplate.convertAndSend("notification_queue", message);

        System.out.println("📤 Notification envoyée à RabbitMQ !");

        return savedReservation;
    }

    // Méthode 2 : Lire une réservation (NOUVELLE ✅)
    public ReservationEntity getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID : " + id));
    }
}