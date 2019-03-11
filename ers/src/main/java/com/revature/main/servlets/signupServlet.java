package com.revature.main.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.main.handlers.Handler;

public class signupServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		RequestDispatcher rd = request.getRequestDispatcher("signup.html");
		rd.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		String email = request.getParameter("email");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String password1 = request.getParameter("password1");
		boolean employeeUpdated = false;
		
		if(!password.equals(password1)) {
			request.setAttribute("error", "Yo password ain't matchin...");
			RequestDispatcher rd = request.getRequestDispatcher("signup.html");
			rd.forward(request, response);
			System.out.println("Password Doesn't Match");
		} else {
			
			employeeUpdated = handler.createEmployee(email, username, password);
			
			if(employeeUpdated) request.setAttribute("error", "Sign Up Successful");
			else request.setAttribute("error", "Sign Up Failed;");
			
			RequestDispatcher rd = request.getRequestDispatcher("login.html");
			rd.forward(request, response);
		}
		
		
	}
	
	
}
