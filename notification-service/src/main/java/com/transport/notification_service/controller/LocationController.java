package com.transport.notification_service.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.util.Map;

@Controller
public class LocationController {

    // Le conducteur envoie ici : /app/sendLocation/12
    // Le serveur renvoie à tous les abonnés ici : /topic/voyage/12
    @MessageMapping("/sendLocation/{voyageId}")
    @SendTo("/topic/voyage/{voyageId}")
    public Map<String, Double> broadcastLocation(@DestinationVariable String voyageId, Map<String, Double> coords) {
        // On affiche dans la console pour vérifier que ça marche
        System.out.println("📍 Bus " + voyageId + " est à : " + coords);
        return coords;
    }
}