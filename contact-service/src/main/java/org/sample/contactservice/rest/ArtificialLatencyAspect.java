package org.sample.contactservice.rest;

import java.util.Random;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Order(Ordered.LOWEST_PRECEDENCE)
@Component
public class ArtificialLatencyAspect {

	@Value( "${api.maxArtificialLatency}" )
	private int maxArtificialLatency; 
	
	private Random randomGenerator = new Random();
	
	private long getRandomLatency() {
		if (maxArtificialLatency > 0) {
			return Math.abs((this.randomGenerator.nextLong() % maxArtificialLatency) * 1000);
		} else {
			return 0l;
		}
	}
	
	
	@Pointcut("within(org.sample.contactservice.rest.*) && "
			+ "(@annotation(org.springframework.web.bind.annotation.GetMapping) || @annotation(org.springframework.web.bind.annotation.PostMapping) "
			+ "|| @annotation(org.springframework.web.bind.annotation.PutMapping) || @annotation(org.springframework.web.bind.annotation.PatchMapping)"
			+ "|| @annotation(org.springframework.web.bind.annotation.DeleteMapping))")
	public void restAPI() {
	}
	
	@Around("restAPI()")
	public Object addLatency(ProceedingJoinPoint joinPoint) throws Throwable {
		Thread.sleep(getRandomLatency());
		return joinPoint.proceed();
	}
}
