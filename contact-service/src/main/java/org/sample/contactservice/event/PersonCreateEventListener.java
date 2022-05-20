package org.sample.contactservice.event;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import io.cloudevents.CloudEvent;

@Profile(value = "kafka")
@Component
public class PersonCreateEventListener extends AbstractCloudEventsKafkaBridge implements ApplicationListener<PersonCreateEvent>  {

	

	private final Logger logger = LoggerFactory.getLogger(getClass());

	
	@Autowired
	public PersonCreateEventListener(KafkaProducer<String, CloudEvent> kafkaProducer) throws URISyntaxException {

		super(kafkaProducer, new URI("http://localhost:8080/v1/api/person"), "person.created");
		
	}

	@Override
	public void onApplicationEvent(PersonCreateEvent event) {

		logger.info("Person with id {} created", event.getPersonId());
		
		
		RecordMetadata metadata = this.forwardEvent("personevents-created", Collections.singletonMap("personid", event.getPersonId()));
		logger.info("Record sent to partition {} with offset {}", metadata.partition(), metadata.offset());

	}

}
