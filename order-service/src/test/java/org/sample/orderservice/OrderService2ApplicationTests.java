package org.sample.orderservice;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.sample.orderservice.entity.Order;
import org.sample.orderservice.entity.objects.Address;
import org.sample.orderservice.entity.objects.OrderItem;
import org.sample.orderservice.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;


@SpringBootTest
class OrderService2ApplicationTests {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	private Address createDummyAddress() {
		return new Address("Andreas", 
				"Krause", "FIFA-Strasse", "20", "8044", "Zurich", "Switzerland");
	}
	
	@Test
	public void writeData() {
		
		Order dummy = new Order();
		
		dummy.setOrderDate("2020-10-10");
		dummy.setCurrencyCode("CHF");
		dummy.setOrderValue(27.5f);
		dummy.setTaxValue(10.5f);
		dummy.setShipTo(createDummyAddress());
		dummy.setSoldTo(createDummyAddress());
		dummy.setBillTo(createDummyAddress());
		dummy.setItems(Collections.singletonList(new OrderItem("10", "00001001", 10, 27.5f)));
		
		Order orderResult = orderRepository.save(dummy);
		
		assertThat(orderResult).isNotNull();
		assertThat(orderResult.getId()).isNotNull().isNotEmpty();
		
		mongoTemplate.remove(orderResult);
		
	}

}
