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

public class TicketServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		ObjectMapper om = new ObjectMapper();
		try {
			Employee user = om.readValue(request.getInputStream(), Employee.class);
			user = handler.getEmployeeByEmail(user.getEmail());
			
			ArrayList<Ticket> userTickets = new ArrayList<Ticket>();
			userTickets = handler.getTicketsOf(user.getEmail());
			
			String userTicketsJSON = om.writeValueAsString(userTickets);
			
			PrintWriter pw = response.getWriter();
			pw.print(userTicketsJSON);
			pw.close();
			
		} catch(Exception e) {
			ArrayList<Ticket> allTickets = handler.getAllTickets();
			String allTicketsJSON = om.writeValueAsString(allTickets);
			
			PrintWriter pw = response.getWriter();
			pw.print(allTicketsJSON);
			pw.close();
		}	
	}
	
	
}
