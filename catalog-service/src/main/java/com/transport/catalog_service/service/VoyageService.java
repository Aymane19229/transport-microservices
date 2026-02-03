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
        if (voyage.getPlacesDisponibles() == 0) voyage.setPlacesDisponibles(50);
        return voyageRepository.save(voyage);
    }

    public List<VoyageEntity> getAllVoyages() { return voyageRepository.findAll(); }

    public VoyageEntity getVoyageById(Long id) {
        return voyageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voyage introuvable : " + id));
    }

    public void deleteVoyage(Long id) { voyageRepository.deleteById(id); }

    // --- GESTION DES PLACES ---

    // 1. Réserver (-1 place)
    public void decrementerPlaces(Long voyageId) {
        VoyageEntity voyage = getVoyageById(voyageId);
        if (voyage.getPlacesDisponibles() > 0) {
            voyage.setPlacesDisponibles(voyage.getPlacesDisponibles() - 1);
            voyageRepository.save(voyage);
        } else {
            throw new RuntimeException("Complet !");
        }
    }

    // 2. Annuler (+1 place) - 👇 C'EST LE NOUVEAU CODE
    public void incrementerPlaces(Long voyageId) {
        VoyageEntity voyage = getVoyageById(voyageId);
        voyage.setPlacesDisponibles(voyage.getPlacesDisponibles() + 1);
        voyageRepository.save(voyage);
    }
}