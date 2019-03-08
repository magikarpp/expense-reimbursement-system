package com.revature.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.main.models.Employee;
import com.revature.services.EmployeeService;

public class EmployeeServlet extends HttpServlet{
	
	private static final long serialVersionUID = -5167183241162598211L;
	
	EmployeeService employeeService = new EmployeeService();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		List<Employee> myEmployees = employeeService.getEmployees();
		
		ObjectMapper om = new ObjectMapper();
		String myEmployeesJSON = om.writeValueAsString(myEmployees);
		myEmployeesJSON = "{\"employees\":"+myEmployeesJSON+"}";
		PrintWriter pw = response.getWriter();
		pw.print(myEmployeesJSON);
		pw.close();
	}
	
}
