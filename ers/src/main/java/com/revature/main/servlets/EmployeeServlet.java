package com.revature.main.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.main.handlers.Handler;
import com.revature.main.models.Employee;

public class EmployeeServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570224L;
	
	private Handler handler = new Handler();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		ObjectMapper om = new ObjectMapper();
		try {
			Employee user = om.readValue(request.getInputStream(), Employee.class);
			user = handler.getEmployeeByEmail(user.getEmail());
			
			ArrayList<Employee> employeeAMan = new ArrayList<Employee>();
			employeeAMan.add(user);
			
			if(!(user.getReportsto() == null)) employeeAMan.add(handler.getEmployeeByEmail(user.getReportsto()));
			String employeeJSON = om.writeValueAsString(employeeAMan);
			
			PrintWriter pw = response.getWriter();
			pw.print(employeeJSON);
			pw.close();
			
		} catch(Exception e) {
//			e.printStackTrace(System.out);
			ArrayList<Employee> allEmployees = handler.getAllEmployees();
			String employeesJSON = om.writeValueAsString(allEmployees);
			
			PrintWriter pw = response.getWriter();
			pw.print(employeesJSON);
			pw.close();
		}	
	}
	
	
}
