package org.sample.orderservice.service;

import org.sample.orderservice.entity.Order;

public interface OrderService {

	Order saveOrder(Order order);

	Iterable<Order> listOrders();

	Order findOrder(String id);

	void deleteOrder(String id);



	void deleteAllOrders();

	Iterable<Order> listOrders(int page, int size);

	
	long getNumberOfOrders();

}