package com.revature.main.models;

public class Employee {
	private String email;
	private String name;
	private String password;
	private int ismanager;
	private String reportsto;
	
	public Employee() {
		email = "";
		name = "";
		password = "";
		ismanager = 0;
		reportsto = "";
	}
	
	public Employee(String email, String name, String password, int ismanager, String reportsto) {
		this.email = email;
		this.name = name;
		this.password = password;
		this.ismanager = ismanager;
		this.reportsto = reportsto;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public int getIsmanager() {
		return ismanager;
	}

	public void setIsmanager(int ismanager) {
		this.ismanager = ismanager;
	}

	public String getReportsto() {
		return reportsto;
	}

	public void setReportsto(String reportsto) {
		this.reportsto = reportsto;
	}

	@Override
	public String toString() {
		return "Employee [email=" + email + ", name=" + name + ", password=" + password + ", ismanager=" + ismanager
				+ ", reportsto=" + reportsto + "]";
	}
	
	
}
