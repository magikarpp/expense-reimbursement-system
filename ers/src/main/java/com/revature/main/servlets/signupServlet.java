package com.revature.main.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.main.handlers.Handler;
import com.revature.main.models.Employee;

public class signupServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		RequestDispatcher rd = request.getRequestDispatcher("signup.jsp");
		rd.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {;
	
		PrintWriter pw = response.getWriter();
		ObjectMapper om = new ObjectMapper();
		Employee newEmployee = om.readValue(request.getInputStream(), Employee.class);
		
		if(handler.createEmployee(newEmployee.getEmail(), newEmployee.getName(), newEmployee.getPassword())) pw.print("success");
		else pw.print("failure");
		
		pw.close();
	}
	
	
}
