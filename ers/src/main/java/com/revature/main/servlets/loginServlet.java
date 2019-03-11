package com.revature.main.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.main.handlers.Handler;

public class loginServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
//		String error = (String) request.getAttribute("error");
		RequestDispatcher rd = request.getRequestDispatcher("login.html");
		rd.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		RequestDispatcher rd;
		
		if(handler.validateLogin(email, password)) rd = request.getRequestDispatcher("EDashboard.html");
		else rd = request.getRequestDispatcher("login.html");
		
		rd.forward(request, response);
		
	}
}
