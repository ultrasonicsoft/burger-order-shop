package org.sample.contactservice.service;

import org.sample.contactservice.entity.Person;

public interface PersonService {

	Person savePerson(Person person);

	Person deltaUpdate(Person person);

	Iterable<Person> listPersons();

	Person findPerson(String id);

	void deletePerson(String id);

	Iterable<Person> search(Person person);

	void deleteAllPersons();

	Iterable<Person> listPersons(int page, int size);

	Iterable<Person> search(Person person, int page, int size);
	
	long getNumberOfPersons();

}