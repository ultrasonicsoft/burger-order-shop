package org.sample.orderservice.entity.objects;

import io.swagger.annotations.ApiModelProperty;


public class OrderItem {
	@ApiModelProperty(name = "Item Number", example = "00010", notes = "Unique identifier of the Order Item")
	private String itemId;
	@ApiModelProperty(name = "Product ID", example = "100000101", notes = "Unique identifier of the Product")
	private String productId;
	@ApiModelProperty(name = "Order Quantity", example = "5", notes = "Quantity of the Product")
	private int quantity;
	@ApiModelProperty(name = "Item Price", example = "5.27", notes = "Price of the Order Item w/o taxes")
	private float itemPrice;
	
	
	
	public OrderItem() {
		super();
	}
	
	
	
	public OrderItem(String itemId, String productId, int quantity, float itemPrice) {
		super();
		this.itemId = itemId;
		this.productId = productId;
		this.quantity = quantity;
		this.itemPrice = itemPrice;
	}



	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getItemPrice() {
		return itemPrice;
	}
	public void setItemPrice(float itemPrice) {
		this.itemPrice = itemPrice;
	}
	
	
	
}