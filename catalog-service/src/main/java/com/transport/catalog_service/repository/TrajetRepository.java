package com.transport.catalog_service.repository;

import com.transport.catalog_service.entity.TrajetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TrajetRepository extends JpaRepository<TrajetEntity, Long> {
}
