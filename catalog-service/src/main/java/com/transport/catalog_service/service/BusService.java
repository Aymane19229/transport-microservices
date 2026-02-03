package com.transport.catalog_service.service;

import com.transport.catalog_service.entity.BusEntity;
import com.transport.catalog_service.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;

    // Ajouter un bus
    public BusEntity ajouterBus(BusEntity bus){
        return busRepository.save(bus);
    }

    // Récupérer la liste de tous les bus
    public List<BusEntity> getAllBus(){
        return busRepository.findAll();
    }

    // Retrouver un bus précis
    public BusEntity getBusById(Long id) {
        return busRepository.findById(id).orElse(null);
    }

    // 👇 AJOUTÉ : Supprimer un bus (Pour l'Admin)
    public void deleteBus(Long id) {
        busRepository.deleteById(id);
    }
}