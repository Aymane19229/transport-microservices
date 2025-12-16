package com.transport.notification_service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    // Cette méthode surveille la file "notification_queue"
    // Dès qu'un message arrive, elle se déclenche !
    @RabbitListener(queues = "notification_queue")
    public void consumeMessage(String message) {
        System.out.println("=======================================");
        System.out.println("📩 NOUVELLE NOTIFICATION REÇUE !");
        System.out.println("Contenu : " + message);
        System.out.println("📧 Simulation : Envoi d'email en cours...");
        System.out.println("=======================================");
    }
}