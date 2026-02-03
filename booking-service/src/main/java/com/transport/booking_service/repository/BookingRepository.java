package com.transport.booking_service.repository;

import com.transport.booking_service.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {

    // Pour afficher "Mes Tickets" côté passager
    List<BookingEntity> findByPassengerId(Long passengerId);
}