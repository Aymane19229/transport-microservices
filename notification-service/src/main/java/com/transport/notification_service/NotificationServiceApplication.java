package com.transport.notification_service;

import org.springframework.amqp.core.Queue; // <--- Import indispensable
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotificationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationServiceApplication.class, args);
	}

	// C'est ici qu'on demande à Spring de créer la file dans RabbitMQ
	@Bean
	public Queue createQueue() {
		// "notification_queue" est le nom de la boîte aux lettres
		// true = durable (elle ne disparaît pas si RabbitMQ redémarre)
		return new Queue("notification_queue", true);
	}

}