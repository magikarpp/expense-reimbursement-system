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
import com.revature.main.models.Ticket;

public class newTicketServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		ObjectMapper om = new ObjectMapper();
		Ticket newTicket = om.readValue(request.getInputStream(), Ticket.class);
		
		boolean created = handler.createTicket(newTicket.getAmount(), newTicket.getCategory(), newTicket.getEmail());
		
		PrintWriter pw = response.getWriter();
		
		if(created) pw.print("success");
		else pw.print("failure");
		
		pw.close();
			
	}
	
	
}
