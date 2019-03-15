package com.revature.main.models;

import java.sql.Timestamp;

public class Ticket {
	
	private int id;
	private Timestamp date;
	private double amount;
	private String category;
	private String status;
	private String email;
	
	public Ticket() {
		super();
	}
	
	public Ticket(int id, Timestamp date, double amount, String category, String status, String email) {
		this.id = id;
		this.date = date;
		this.amount = amount;
		this.category = category;
		this.status = status;
		this.email = email;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Timestamp getDate() {
		return date;
	}
	public void setDate(Timestamp date) {
		this.date = date;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Ticket [id=" + id + ", date=" + date + ", amount=" + amount + ", category=" + category + ", status="
				+ status + ", email=" + email + "]";
	}
	
	
}
