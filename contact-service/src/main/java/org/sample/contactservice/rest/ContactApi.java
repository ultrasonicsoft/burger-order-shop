package org.sample.contactservice.rest;

import java.util.Collections;
import java.util.Map;
import java.util.stream.StreamSupport;

import org.sample.contactservice.entity.Person;
import org.sample.contactservice.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.swagger.annotations.ApiOperation;


@RestController
@RequestMapping("/api/v1/person")
public class ContactApi {
	
	@Autowired
	private PersonService personService;	
	
	
	
	@PostMapping
	@ApiOperation(value="Create Person", notes="This function creates a new person entry on the DB."
			+ "Externally supplied ids are ignored.")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Person> create(@RequestBody Person person) {			
		person.setId(null);
		return new ResponseEntity<Person>(personService.savePerson(person), HttpStatus.CREATED);		
	}
	
	
	@GetMapping
	@ApiOperation(value="Get Person List", notes="This function retrieves all persons from the Database.")
	public ResponseEntity<Person[]> findAll(
			@RequestParam(required = false) Integer page, 
			@RequestParam(required = false) Integer size ) {
		
		if (page == null || size == null) {
			return new ResponseEntity<Person[]>(
				StreamSupport.stream(personService.listPersons().spliterator(), false)
					.toArray(Person[]::new), 
					HttpStatus.OK);
		} else {
			return new ResponseEntity<Person[]>(
				StreamSupport.stream(personService.listPersons(page.intValue(),size.intValue()).spliterator(), false)
					.toArray(Person[]::new), 
					HttpStatus.OK);
		}
	}
	
	
	
	@PutMapping(path="/{id}")
	@ApiOperation(value="Update Person", notes="This function updates a person from on the database. "
			+ "This does not support delta updates.")
	public ResponseEntity<Person> upsert(@PathVariable("id") String id, 
			@RequestBody Person person) {
		
		person.setId(id);
		
		return new ResponseEntity<Person>(personService.savePerson(person), HttpStatus.OK); 
	}
	
	@PatchMapping(path="/{id}")
	@ApiOperation(value="Update Person", notes="This function updates a person from on the database. "
			+ "This does support delta updates.")
	public ResponseEntity<Person> deltaUpdate(@PathVariable("id") String id, 
			@RequestBody Person person) {	
			
		person.setId(id);
		return new ResponseEntity<Person>(personService.deltaUpdate(person), HttpStatus.OK); 
	}
	
	@GetMapping(path="/{id}")
	@ApiOperation(value="Read Person by ID", notes="This function reads a single person from the database.")
	public ResponseEntity<Person> read(@PathVariable("id") String id) {
		
		return new ResponseEntity<Person>(personService.findPerson(id), HttpStatus.OK); 
	}
	
	@DeleteMapping(path="/{id}")
	@ApiOperation(value="Delete Person by ID", notes="This function deletes a person from the database.")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		personService.deletePerson(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping
	@ApiOperation(value="Delete all Persons in DB", notes="This function deletes all persons from the database.")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteAll() {
		personService.deleteAllPersons();
		return ResponseEntity.noContent().build();
		
	}
	
	@PostMapping(path="/search")
	@ApiOperation(value="Search for People", notes="This function performs a people search in the database, and returns the persons that meet the criteria " + 
			"specified in the request.")
	public ResponseEntity<Person[]> search(@RequestBody Person person,
			@RequestParam(required = false) Integer page, 
			@RequestParam(required = false) Integer size) {
		if (page == null || size == null) {
			return new ResponseEntity<Person[]>(
				StreamSupport.stream(personService.search(person).spliterator(), false)
								.toArray(Person[]::new),
								 HttpStatus.OK);
		} else {
			return new ResponseEntity<Person[]>(
					StreamSupport.stream(personService.search(person, page, size).spliterator(), false)
									.toArray(Person[]::new),
									 HttpStatus.OK);
		}
	}
	
	
	@GetMapping(path="/count")
	@ApiOperation(value = "Number of Persons", notes = "This function retrieves the amount of persons contained in the database")
	public ResponseEntity<Map<String, Long>> count() {

		return new ResponseEntity<Map<String, Long>>(Collections.singletonMap("personCount", personService.getNumberOfPersons()), HttpStatus.OK);

	}

}
