package com.transport.booking_service.client;

import com.transport.booking_service.dto.VoyageDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "catalog-service", url = "http://localhost:8082")
public interface CatalogClient {
    @GetMapping("/api/voyages/{id}")
    VoyageDTO getVoyageById(@PathVariable("id") Long id);
}