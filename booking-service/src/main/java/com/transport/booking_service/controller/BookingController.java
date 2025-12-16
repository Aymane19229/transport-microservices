package com.transport.booking_service.controller;

import com.transport.booking_service.entity.ReservationEntity;
import com.transport.booking_service.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List; // Import utile si tu veux tout lister plus tard

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // 1. Créer une réservation (Déjà fait)
    @PostMapping
    public ReservationEntity create(@RequestBody ReservationRequest req) {
        return bookingService.reserverVoyage(req.passengerId, req.voyageId);
    }

    // 2. 👇 Consulter une réservation par ID (NOUVEAU)
    @GetMapping("/{id}")
    public ReservationEntity getBookingById(@PathVariable Long id) {
        return bookingService.getReservationById(id);
    }

    // Petite classe DTO interne
    static class ReservationRequest {
        public Long passengerId;
        public Long voyageId;
    }
}