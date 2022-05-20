package org.sample.orderservice.rest;

import java.util.Collections;
import java.util.Map;
import java.util.stream.StreamSupport;

import org.sample.orderservice.entity.Order;
import org.sample.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/api/v1/order")
public class OrderApi {
	
	@Autowired
	private OrderService orderService;	
	
	@PostMapping
	@ApiOperation(value="Create Order", notes="This function creates a new order entry on the DB."
			+ "Externally supplied ids are ignored.")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Order> create(@RequestBody Order order) {			
		order.setId(null);
		return new ResponseEntity<Order>(orderService.saveOrder(order), HttpStatus.CREATED);		
	}
	
	
	@GetMapping
	@ApiOperation(value="Get Order List", notes="This function retrieves all orders from the Database.")
	public ResponseEntity<Order[]> findAll(
			@RequestParam(required = false) Integer page, 
			@RequestParam(required = false) Integer size ) {
		
		if (page == null || size == null) {
			return new ResponseEntity<Order[]>(
				StreamSupport.stream(orderService.listOrders().spliterator(), false)
					.toArray(Order[]::new), 
					HttpStatus.OK);
		} else {
			return new ResponseEntity<Order[]>(
				StreamSupport.stream(orderService.listOrders(page.intValue(),size.intValue()).spliterator(), false)
					.toArray(Order[]::new), 
					HttpStatus.OK);
		}
	}
	
	
	
	@PutMapping(path="/{id}")
	@ApiOperation(value="Update Order", notes="This function updates an order on the database. "
			+ "This does not support delta updates.")
	public ResponseEntity<Order> upsert(@PathVariable("id") String id, 
			@RequestBody Order order) {
		
		order.setId(id);
		
		return new ResponseEntity<Order>(orderService.saveOrder(order), HttpStatus.OK); 
	}
	
	
	@GetMapping(path="/{id}")
	@ApiOperation(value="Read Order by ID", notes="This function reads a single order from the database.")
	public ResponseEntity<Order> read(@PathVariable("id") String id) {
		
		return new ResponseEntity<Order>(orderService.findOrder(id), HttpStatus.OK); 
	}
	
	@DeleteMapping(path="/{id}")
	@ApiOperation(value="Delete Order by ID", notes="This function deletes an order from the database.")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		orderService.deleteOrder(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping
	@ApiOperation(value="Delete all Order in DB", notes="This function deletes all orders from the database.")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteAll() {
		orderService.deleteAllOrders();
		return ResponseEntity.noContent().build();
		
	}
	
	
	@GetMapping(path="/count")
	@ApiOperation(value = "Number of Orders", notes = "This function retrieves the amount of orders contained in the database")
	public ResponseEntity<Map<String, Long>> count() {

		return new ResponseEntity<Map<String, Long>>(Collections.singletonMap("orderCount", orderService.getNumberOfOrders()), HttpStatus.OK);

	}

}
