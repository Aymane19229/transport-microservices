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
    //ajouter un bus
    public BusEntity ajouterBus(BusEntity bus){
        return busRepository.save(bus);
    }
    //recuperer la liste de tout les bus
    public List<BusEntity> getAllBus(){
        return busRepository.findAll();
    }
    //Pour retrouver un bus précis par son ID (utile pour le lier à un voyage)
    public BusEntity getBusById(Long id) {
        return busRepository.findById(id).orElse(null);
    }
}
