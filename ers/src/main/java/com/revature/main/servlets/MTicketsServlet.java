package com.revature.main.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.revature.main.handlers.Handler;

public class MTicketsServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048455708L;
	
	private Handler handler = new Handler();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		HttpSession session = request.getSession(false);
		
		if(session.getAttribute("user") == null){
    		response.sendRedirect("/ers/login");
    	} else {
    		if(handler.isManager(session.getAttribute("user").toString())) {
    			RequestDispatcher rd = request.getRequestDispatcher("MTickets.jsp");
    			rd.forward(request, response);
    		} else {
    			response.sendRedirect("/ers/login");
    		}
    	}
	}
}
