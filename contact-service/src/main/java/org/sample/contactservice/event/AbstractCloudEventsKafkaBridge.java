package org.sample.contactservice.event;

import java.net.URI;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.sample.contactservice.exception.PersonServiceException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.cloudevents.CloudEvent;
import io.cloudevents.core.builder.CloudEventBuilder;


public abstract class AbstractCloudEventsKafkaBridge {

	private final ObjectMapper objectMapper = new ObjectMapper();
	
	private KafkaProducer<String, CloudEvent> kafkaProducer;
	private CloudEventBuilder eventTemplate;
	private String eventType;
	
	protected AbstractCloudEventsKafkaBridge(KafkaProducer<String, CloudEvent> kafkaProducer,
			URI eventUri, String eventType) {
		super();
		this.kafkaProducer = kafkaProducer;
		this.eventType = eventType;
		eventTemplate = CloudEventBuilder.v1()
				.withSource(eventUri)
				.withType(this.eventType);
	}


	protected RecordMetadata forwardEvent(String topic, Object eventData) {
		try {
			String id = UUID.randomUUID().toString();

			// Create the event starting from the template
			CloudEvent cloudEvent = eventTemplate.newBuilder().withId(id)
					.withData("application/json", 
							objectMapper.writeValueAsBytes(eventData))
					.build();

			// Send the record

			return kafkaProducer.send(new ProducerRecord<>(topic, id, cloudEvent)).get();


		} catch (InterruptedException e) {
			throw new PersonServiceException(String.format("Error sending Event %s: %s", eventType, e.getCause()), e);
		} catch (ExecutionException e) {
			throw new PersonServiceException(String.format("Error sending Event %s: %s", eventType, e.getCause()), e);
		} catch (JsonProcessingException e) {
			throw new PersonServiceException(String.format("Error sending Event %s: %s", eventType, e.getCause()), e);
		} catch (IllegalStateException e) {
			throw new PersonServiceException(String.format("Error sending Event %s: %s", eventType, e.getCause()), e);
		}
	}
}
