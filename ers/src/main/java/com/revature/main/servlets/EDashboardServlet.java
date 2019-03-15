package com.revature.main.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class EDashboardServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		RequestDispatcher rd = request.getRequestDispatcher("EDashboard.jsp");
		rd.forward(request, response);
	}
}
