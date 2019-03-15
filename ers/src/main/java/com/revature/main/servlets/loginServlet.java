package com.revature.main.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.main.handlers.Handler;
import com.revature.main.models.Employee;

public class loginServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		RequestDispatcher rd = request.getRequestDispatcher("login.jsp");
		rd.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		PrintWriter pw = response.getWriter();
		ObjectMapper om = new ObjectMapper();
		Employee newEmployee = om.readValue(request.getInputStream(), Employee.class);
		
		if(handler.validateLogin(newEmployee.getEmail(), newEmployee.getPassword())) {
			newEmployee = handler.getEmployeeByEmail(newEmployee.getEmail());
			HttpSession session = request.getSession();
			session.setAttribute("user", newEmployee.getEmail());
			//setting session to expiry in 30 mins
			session.setMaxInactiveInterval(30*60);
			
			pw.print("success");
		}
		else pw.print("failure");
		
		pw.close();
	}
}
