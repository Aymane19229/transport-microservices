package com.transport.catalog_service.repository;

import com.transport.catalog_service.entity.BusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface BusRepository extends JpaRepository<BusEntity, Long> {
}
