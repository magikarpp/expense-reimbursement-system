package com.revature.services;

import java.util.ArrayList;
import java.util.List;

import com.revature.main.models.Employee;

public class EmployeeService {
	private List<Employee> employees = new ArrayList<Employee>();
	
	public EmployeeService() {
		employees.add(new Employee("Jayby"));
		employees.add(new Employee("Magikarp"));
		employees.add(new Employee("Alfonzo"));
		employees.add(new Employee("Ralph"));
		
	}
	
	public List<Employee> getEmployees(){
		return employees;
	}
}
