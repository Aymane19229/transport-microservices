package com.transport.catalog_service.service;

import com.transport.catalog_service.entity.TrajetEntity;
import com.transport.catalog_service.repository.TrajetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class TrajetService {
    @Autowired
    private TrajetRepository trajetRepository;
    //ajouter un trajet
    public TrajetEntity ajouterTrajet(TrajetEntity trajet){
        return trajetRepository.save(trajet);
    }
    //voir liste des trajets
    public List<TrajetEntity> getAllTrajet(){
        return trajetRepository.findAll();
    }
}
