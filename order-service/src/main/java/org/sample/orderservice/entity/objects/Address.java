package org.sample.orderservice.entity.objects;

import io.swagger.annotations.ApiModelProperty;


public class Address {
	@ApiModelProperty(name = "First Name", example = "John", notes = "First Name of the Person")
	private String firstName;

	@ApiModelProperty(name = "Last Name", example = "Doe", notes = "Last Name of the Person")
	private String lastName;

	@ApiModelProperty(name = "Street Address", example = "Theresienstrasse", notes = "Street name w/o house number")
	private String streetAddress;

	@ApiModelProperty(name = "House Number", example = "6", notes = "House Number")
	private String houseNumber;

	@ApiModelProperty(name = "ZIP", example = "80333", notes = "ZIP Code")
	private String zip;

	@ApiModelProperty(name = "City", example = "Muenchen", notes = "City Name")
	private String city;

	@ApiModelProperty(name = "Country", example = "Germany", notes = "Name of the Country")
	private String country;
	
	
	
	public Address() {
		super();
	}

	public Address(String firstName, String lastName, String streetAddress, String houseNumber, String zip, String city,
			String country) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.streetAddress = streetAddress;
		this.houseNumber = houseNumber;
		this.zip = zip;
		this.city = city;
		this.country = country;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
