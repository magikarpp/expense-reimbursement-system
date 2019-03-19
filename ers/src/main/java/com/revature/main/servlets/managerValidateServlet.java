package com.revature.main.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.main.handlers.Handler;

public class managerValidateServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6831085441048570808L;
	
	private Handler handler = new Handler();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		String[] things = request.getReader().readLine().split(" ");
		String[] info = (things[0] + " " + things[1]).substring(1, (things[0]+things[1]+1).length()-1).split(" ");
		String password = info[0];
		
		boolean match = handler.validateManagerPassword(password);
		
		PrintWriter pw = response.getWriter();
		
		if(match) {
			if(handler.changeToManager(info[1])) pw.print("success");
		}
		else pw.print("failure");
		
		pw.close();
			
	}
	
	
}
