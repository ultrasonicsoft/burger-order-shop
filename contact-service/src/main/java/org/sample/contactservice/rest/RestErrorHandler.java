package org.sample.contactservice.rest;

import javax.servlet.http.HttpServletRequest;

import org.sample.contactservice.exception.NotFoundException;
import org.sample.contactservice.exception.PersonServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.AllArgsConstructor;
import lombok.Data;



@ControllerAdvice
public class RestErrorHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(value=NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ResponseEntity<RestError> handleResourceNotAvailable(HttpServletRequest request, RuntimeException e) {
		RestError restError = new RestError(e.getMessage());
		return new ResponseEntity<RestError>(restError, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(value=PersonServiceException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ResponseEntity<RestError> handlePersonServiceException(HttpServletRequest request, RuntimeException e) {
		RestError restError = new RestError(e.getMessage());
		return new ResponseEntity<RestError>(restError, HttpStatus.NOT_FOUND);
	}
	
	@Data
	@AllArgsConstructor
	public static class RestError {
		private String message;
	}
}
