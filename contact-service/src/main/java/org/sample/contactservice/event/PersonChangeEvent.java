package org.sample.contactservice.event;

import org.sample.contactservice.entity.Person;
import org.springframework.context.ApplicationEvent;



public class PersonChangeEvent extends ApplicationEvent implements PersonEvent {
	
	private static final long serialVersionUID = 7484258772054118761L;
	
	
	public PersonChangeEvent(Person source) {
		super(source); 
	}

	@Override
	public String getPersonId() {		
		return ((Person)this.getSource()).getId();
	}	

}
