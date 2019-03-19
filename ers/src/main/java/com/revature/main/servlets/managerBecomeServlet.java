package com.revature.main.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.main.handlers.Handler;

public class managerBecomeServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		String[] things = request.getReader().readLine().split(" ");
		
		String[] info = (things[0] + " " + things[1]).substring(1, (things[0]+things[1]+1).length()-1).split(" ");
		
		String goonEmail = info[0];
		String managerEmail = info[1];
		
		boolean approved = handler.becomeManagerOf(goonEmail, managerEmail);
		
		PrintWriter pw = response.getWriter();
		
		if(approved) pw.print("success");
		else pw.print("failure");
		
		pw.close();
			
	}
	
	
}
