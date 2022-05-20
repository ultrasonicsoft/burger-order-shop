package org.sample.contactservice;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.sample.contactservice.entity.Person;
import org.sample.contactservice.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;


@SpringBootTest
class Contactservice2ApplicationTests {

	@Autowired
	private PersonRepository personRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	private Person createDummyPerson() {
		return new Person(null, "Andreas", 
				"Krause", "FIFA-Strasse", "20", "8044", "Zurich", "Switzerland", null);
	}
	
	@Test
	public void writeData() {
		
		Person dummy = createDummyPerson();
		
		Person personResult = personRepository.save(dummy);
		
		assertThat(personResult).isNotNull();
		assertThat(personResult.getId()).isNotNull().isNotEmpty();
		
		mongoTemplate.remove(personResult);
		
	}

}
