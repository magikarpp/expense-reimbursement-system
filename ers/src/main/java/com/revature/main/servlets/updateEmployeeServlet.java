package com.revature.main.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.main.handlers.Handler;
import com.revature.main.models.Employee;

public class updateEmployeeServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		PrintWriter pw = response.getWriter();
		ObjectMapper om = new ObjectMapper();
		Employee tempEmployee = om.readValue(request.getInputStream(), Employee.class);
		Employee updatedEmployee = null;
		if(tempEmployee.getPassword() != null) {
			updatedEmployee = handler.getEmployeeByEmail(tempEmployee.getPassword());
			updatedEmployee.setEmail(tempEmployee.getEmail());
			updatedEmployee.setName(tempEmployee.getName());
		} else updatedEmployee = handler.getEmployeeByEmail(tempEmployee.getEmail());
		
		if(tempEmployee.getIsmanager() == 0 || tempEmployee.getIsmanager() == 1) {
			updatedEmployee.setIsmanager(tempEmployee.getIsmanager());
		}
		if(tempEmployee.getReportsto() != null){
			updatedEmployee.setReportsto(tempEmployee.getReportsto());
		}
		
		System.out.println(updatedEmployee.toString());
		if(handler.updateEmployee(tempEmployee.getPassword(), updatedEmployee)) pw.print("success");
		else pw.print("failure");
		
		pw.close();
	}
}
