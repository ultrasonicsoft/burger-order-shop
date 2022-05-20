package org.sample.contactservice.repository;

import org.sample.contactservice.entity.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;



public interface PersonRepository extends CrudRepository<Person, String>,
											QueryByExampleExecutor<Person>,PagingAndSortingRepository<Person, String>{

}
