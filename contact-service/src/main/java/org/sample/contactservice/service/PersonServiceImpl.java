package org.sample.contactservice.service;

import java.util.Optional;

import org.sample.contactservice.entity.Person;
import org.sample.contactservice.event.PersonChangeEvent;
import org.sample.contactservice.event.PersonCreateEvent;
import org.sample.contactservice.event.PersonDeleteEvent;
import org.sample.contactservice.event.PersonEvent;
import org.sample.contactservice.exception.NotFoundException;
import org.sample.contactservice.exception.PersonServiceException;
import org.sample.contactservice.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;


@Service("PersonService")
public class PersonServiceImpl implements PersonService {
	
	
	private PersonRepository repository;
	
	@Autowired
    private ApplicationEventPublisher applicationEventPublisher;
	
	@Autowired
	public PersonServiceImpl(MeterRegistry registry, PersonRepository repository) {
		this.repository = repository;
		
		Gauge.builder("personservice.persistency.repository.size", repository, PersonRepository::count)
				.tag("Repository", "Persons").register(registry);
		
	}
	
	private void publishPersonEvent(PersonEvent event) {
		applicationEventPublisher.publishEvent(event);
	}
	
	
	@Override
	public Person savePerson(Person person) {
		
		Person savedPerson;
		
		//prevent no change updates
		if(person.getId() != null) {
			Optional<Person> dbResult = repository.findById(person.getId()); 
			
			if (dbResult.isPresent()) {
				
				if (dbResult.get().equals(person)) {
					// no event needed, sue to no change ;-)
					return dbResult.get();
				} else {
					savedPerson = repository.save(person);					
					publishPersonEvent(new PersonChangeEvent(savedPerson));					
					return savedPerson;
				}
				
			} else {
				savedPerson = repository.save(person);					
				publishPersonEvent(new PersonCreateEvent(savedPerson));					
				return savedPerson;
			}
		} else {		
			savedPerson = repository.save(person);					
			publishPersonEvent(new PersonCreateEvent(savedPerson));					
			return savedPerson;
		}
	}

	@Override
	public Person deltaUpdate(Person person) {
		
		Person savedPerson;
		
		if(person.getId() == null) {
			throw new PersonServiceException("ID of Person must not be null");
		}
			
		Optional<Person> currentPersonOptional = repository.findById(person.getId());
			
		if(currentPersonOptional.isPresent()) {	
			
			
			Person mergedPerson = currentPersonOptional.get();
			
			mergedPerson.setFirstName(
					person.getFirstName() == null ? mergedPerson.getFirstName() : person.getFirstName()
					);
			
			mergedPerson.setLastName(
					person.getLastName() == null ? mergedPerson.getLastName() : person.getLastName()
					);
			
			mergedPerson.setCity(
					person.getCity() == null ? mergedPerson.getCity() : person.getCity()
					);
			
			mergedPerson.setZip(
					person.getZip() == null ? mergedPerson.getZip() : person.getZip()
					);
			
			mergedPerson.setHouseNumber(
					person.getHouseNumber() == null ? mergedPerson.getHouseNumber() : person.getHouseNumber()
					);
			
			mergedPerson.setStreetAddress(
					person.getStreetAddress() == null ? mergedPerson.getStreetAddress() : person.getStreetAddress()
					);

			mergedPerson.setCountry(
					person.getCountry() == null ? mergedPerson.getCountry() : person.getCountry()
					);
			
			//not deep but good enough ;-)
			person.getExtensionFields()
				.forEach((key, value) -> mergedPerson.getExtensionFields().put(key, value));
			
			//check if there was a change, not very elegant but works
			currentPersonOptional = repository.findById(person.getId());
			if(currentPersonOptional.get().equals(mergedPerson)) {	
				
				return currentPersonOptional.get();
			} else  {
				
				savedPerson = repository.save(mergedPerson);
				publishPersonEvent(new PersonChangeEvent(savedPerson));
				return savedPerson;
			}
			
		} else {
			savedPerson = repository.save(person);	
			publishPersonEvent(new PersonCreateEvent(person));
			return savedPerson;			
		}		
	}
	

	@Override
	public Iterable<Person> listPersons() {
	
		return repository.findAll();
	}
	

	@Override
	public Iterable<Person> listPersons(int page, int size) {
	
		return repository.findAll(PageRequest.of(page, size));
	}
	

	@Override
	public Person findPerson(String id) {	
		Optional<Person> result = repository.findById(id);
		
		if(!result.isPresent()) {
			throw new NotFoundException(String.format(
					"Person with id '%s' not found", id));
		}
				
		return result.isPresent() ? result.get() : null;
	}	
	

	@Override
	public void deletePerson(String id) {
		
		if(id == null) {
			throw new PersonServiceException("ID of Person must not be null");
		}
		
		repository.deleteById(id);
		
		publishPersonEvent(new PersonDeleteEvent(id));
	}	
	

	@Override
	public Iterable<Person> search(Person person) {		
		return repository.findAll(Example.of(person));
	}
	

	@Override
	public Iterable<Person> search(Person person, int page, int size) {		
		
		return repository.findAll(Example.of(person), PageRequest.of(page, size));
	}
	

	@Override
	public void deleteAllPersons() {
		
		repository.findAll().forEach(person -> {
			deletePerson(person.getId());
		});	
	}

	@Override
	public long getNumberOfPersons() {
		
		return repository.count();
	}
}
