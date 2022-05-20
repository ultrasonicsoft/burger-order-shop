package org.sample.orderservice.exception;

public class OrderServiceException extends RuntimeException{

	private static final long serialVersionUID = -9204263913670593402L;

	public OrderServiceException(String message) {
		super(message);
	}
	
	public OrderServiceException(String message, Throwable e) {
		super(message, e);
	}
}
