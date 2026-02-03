package com.transport.booking_service.controller;

import com.transport.booking_service.entity.BookingEntity;
import com.transport.booking_service.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired private BookingService bookingService;

    @PostMapping
    public BookingEntity book(@RequestParam Long passengerId, @RequestParam Long voyageId) {
        return bookingService.createBooking(passengerId, voyageId);
    }

    @GetMapping("/passenger/{id}")
    public List<BookingEntity> getMyBookings(@PathVariable Long id) {
        return bookingService.getByPassenger(id);
    }

    // 👇 Endpoint d'annulation
    @PutMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }
}