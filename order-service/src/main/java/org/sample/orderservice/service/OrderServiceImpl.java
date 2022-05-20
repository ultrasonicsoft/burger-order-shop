package org.sample.orderservice.service;

import java.util.Optional;

import org.sample.orderservice.entity.Order;
import org.sample.orderservice.exception.NotFoundException;
import org.sample.orderservice.exception.OrderServiceException;
import org.sample.orderservice.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;

@Service("PersonService")
public class OrderServiceImpl implements OrderService {

	private OrderRepository repository;

	@Autowired
	public OrderServiceImpl(MeterRegistry registry, OrderRepository repository) {
		this.repository = repository;

		Gauge.builder("orderservice.persistency.repository.size", repository, OrderRepository::count)
				.tag("Repository", "Orders").register(registry);

	}

	@Override
	public Order saveOrder(Order order) {
		return repository.save(order);
	}

	@Override
	public Iterable<Order> listOrders() {
		return repository.findAll();
	}

	@Override
	public Order findOrder(String id) {
		Optional<Order> result = repository.findById(id);
		if (!result.isPresent()) {
			throw new NotFoundException(String.format("Order with id '%s' not found", id));
		}
		return result.isPresent() ? result.get() : null;
	}

	@Override
	public void deleteOrder(String id) {
		if (id == null) {
			throw new OrderServiceException("ID of Order must not be null");
		}
		repository.deleteById(id);
	}


	@Override
	public void deleteAllOrders() {
		repository.deleteAll();
	}

	@Override
	public Iterable<Order> listOrders(int page, int size) {
		return repository.findAll(PageRequest.of(page, size));
	}


	@Override
	public long getNumberOfOrders() {
		return repository.count();
	}

}
