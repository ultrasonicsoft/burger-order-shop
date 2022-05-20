package org.sample.contactservice.dataload;

import org.sample.contactservice.entity.Person;
import org.sample.contactservice.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.github.javafaker.Address;
import com.github.javafaker.Faker;


@Component
public class PersonDataGenerator implements CommandLineRunner {
	
	@Autowired
	private PersonRepository personRepository;
	
	@Value( "${dataload.numberOfPersons}" )
	private int numberOfPersons; 
	
	@Override
	public void run(String... args) throws Exception {
		Faker faker = new Faker();
		
		long fakePersons = numberOfPersons - personRepository.count();
		for (long counter = 0; counter < fakePersons; counter++) {
			Address fakeAddress = faker.address();
			
			personRepository.save(new Person(null, fakeAddress.firstName(), fakeAddress.lastName(), 
					fakeAddress.streetName(), fakeAddress.streetAddressNumber(), fakeAddress.zipCode(), fakeAddress.city(), fakeAddress.country(),null));
		}
		
		
	}

}
