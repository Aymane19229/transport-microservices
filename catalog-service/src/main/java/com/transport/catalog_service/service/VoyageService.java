package com.transport.catalog_service.service;

import com.transport.catalog_service.entity.VoyageEntity;
import com.transport.catalog_service.repository.VoyageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VoyageService {

    @Autowired
    private VoyageRepository voyageRepository;

    public VoyageEntity planifierVoyage(VoyageEntity voyage) {
        return voyageRepository.save(voyage);
    }

    public List<VoyageEntity> chercherVoyages(String depart, String arrivee) {
        return voyageRepository.findByTrajetVilleDepartAndTrajetVilleArrivee(depart, arrivee);
    }

    public List<VoyageEntity> getAllVoyages() {
        return voyageRepository.findAll();
    }
    // Dans VoyageService.java
    public VoyageEntity getVoyageById(Long id) {
        return voyageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voyage introuvable avec l'ID : " + id));
    }
}