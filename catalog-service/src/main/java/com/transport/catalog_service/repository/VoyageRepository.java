package com.transport.catalog_service.repository;

import com.transport.catalog_service.entity.VoyageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VoyageRepository extends JpaRepository<VoyageEntity, Long> {

    // Cette méthode fonctionne maintenant car VoyageEntity a bien un champ 'trajet'
    // et TrajetEntity a bien des champs 'villeDepart' / 'villeArrivee'
    List<VoyageEntity> findByTrajetVilleDepartAndTrajetVilleArrivee(String depart, String arrivee);
}