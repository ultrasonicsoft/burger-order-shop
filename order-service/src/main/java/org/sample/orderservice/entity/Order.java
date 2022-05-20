package org.sample.orderservice.entity;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

import org.sample.orderservice.entity.objects.Address;
import org.sample.orderservice.entity.objects.OrderItem;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order implements Serializable {

	private static final long serialVersionUID = 49994416335608157L;

	@Id
	@ApiModelProperty(name = "ID", example = "1bf8b88a-7bb8-4b92-90bc-d1fa34a60a57", notes = "Unique MongoDB identifier")
	private String id;
	
	@ApiModelProperty(name = "Order Date", example = "2022-01-10", notes = "Date of Order Capture")
	private String orderDate;
	
	@ApiModelProperty(name = "Order Value", example = "100.25", notes = "Value of the Order")
	private float orderValue;

	@ApiModelProperty(name = "Tax Value", example = "10.03", notes = "Value of the Taxes")
	private float taxValue;
	
	@ApiModelProperty(name = "Currency", example = "EUR", notes = "Order Currency")
	private String currencyCode;
	
	@ApiModelProperty(name = "Sold-To Address", notes = "Sold-To Address")
	private Address soldTo;
	
	@ApiModelProperty(name = "Bill-To Address", notes = "Billing Address")
	private Address billTo;
	
	@ApiModelProperty(name = "Ship-To Address", notes = "Shipping Address")
	private Address shipTo;
	
	@ApiModelProperty(name = "Order Items", notes = "Items of the Order")
	private List<OrderItem> items = Collections.emptyList();
	
}
