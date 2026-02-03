package com.transport.booking_service.service;

import com.transport.booking_service.entity.BookingEntity;
import com.transport.booking_service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class BookingService {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private RestTemplate restTemplate;

    private final String CATALOG_URL = "http://localhost:8080/api/voyages/";

    public BookingEntity createBooking(Long passengerId, Long voyageId) {
        // 1. Tenter de réserver la place (Catalog)
        try {
            restTemplate.put(CATALOG_URL + voyageId + "/reserver", null);
        } catch (Exception e) {
            throw new RuntimeException("Voyage complet ou erreur technique.");
        }
        // 2. Créer le ticket
        BookingEntity booking = new BookingEntity();
        booking.setPassengerId(passengerId);
        booking.setVoyageId(voyageId);
        return bookingRepository.save(booking);
    }

    // 👇 ANNULATION DU TICKET
    public void cancelBooking(Long id) {
        BookingEntity booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket introuvable"));

        if (!"ANNULE".equals(booking.getStatut())) {
            // 1. Changer le statut localement
            booking.setStatut("ANNULE");
            bookingRepository.save(booking);

            // 2. Libérer la place dans Catalog-Service via Gateway (Port 8080)
            restTemplate.put(CATALOG_URL + booking.getVoyageId() + "/liberer", null);
        }
    }

    public List<BookingEntity> getByPassenger(Long id) {
        return bookingRepository.findByPassengerId(id);
    }
}