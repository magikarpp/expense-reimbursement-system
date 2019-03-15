package com.revature.main.handlers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import com.revature.main.models.Employee;
import com.revature.main.models.Ticket;

public class Handler {
	
	// Get Employee By Email
	public Employee getEmployeeByEmail(String email) {
		Employee tempEmployee = null;
		
		String sql = "SELECT * FROM Employee WHERE Email = ?";	
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setString(1, email);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				String eemail = rs.getString("Email");
				String name = rs.getString("Name");
				String password = rs.getString("Password");
				int ismanager = rs.getInt("IsManager");
				String reportsto = rs.getString("Reportsto");
				tempEmployee = new Employee(eemail, name, password, ismanager, reportsto);
			}
			
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return tempEmployee;
	}
	
	// Get ALL Employees
	public ArrayList<Employee> getAllEmployees(){
		ArrayList<Employee> allEmployees = new ArrayList<Employee>();
		Employee tempEmployee = null;
		
		String sql = "SELECT * FROM Employee";	
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				String eemail = rs.getString("Email");
				String name = rs.getString("Name");
				String password = rs.getString("Password");
				int ismanager = rs.getInt("IsManager");
				String reportsto = rs.getString("Reportsto");
				tempEmployee = new Employee(eemail, name, password, ismanager, reportsto);
				allEmployees.add(tempEmployee);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return allEmployees;
	}
	
	// Does Employee Exist?
	public boolean employeeExists(String email) {
		boolean exists = false;
		
		String sql = "SELECT * FROM Employee WHERE Email = ?";	
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setString(1, email);
			
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				exists = true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return exists;
	}
	
	// Validate Login
	public boolean validateLogin(String email, String password) {
		boolean valid = false;
		
		if(employeeExists(email)) {
			Employee tempEmployee = getEmployeeByEmail(email);
			
			if(tempEmployee.getPassword().equals(password)) valid = true;
		}
		
		return valid;
	}

	// Create Employee
	public boolean createEmployee(String email, String name, String password) {
		boolean created = false;
		if(!employeeExists(email)) {
			String sql = "INSERT INTO Employee VALUES (?, ?, ?, 0, NULL)";
			int employeeUpdated = 0;
			
			try(Connection con = ConnectionUtil.getConnectionFromFile();
				PreparedStatement ps = con.prepareStatement(sql);){
				
				ps.setString(1, email);
				ps.setString(2, name);
				ps.setString(3, password);
				employeeUpdated = ps.executeUpdate();
				System.out.println("Sign Up Successful");
					
			} catch (SQLException | IOException e) {
				System.out.println("Sign Up Failed");
				e.printStackTrace();
			}
			if(employeeUpdated > 0) created = true;
		}
		
		return created;
	}
	
	// Create new Ticket
	public boolean createTicket(double amount, String category, String email) {
		boolean created = true;
		int id = 0;
		Timestamp date = new Timestamp(System.currentTimeMillis());
		
		String sql0 = "SELECT MAX(Id) AS \"Top\" FROM Ticket";
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql0);){
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				id = rs.getInt("Top") + 1;
			}
					
		} catch (SQLException | IOException e) {
			System.out.println("Ticket Failed to create.");
			e.printStackTrace();
			return false;
		}
		
		String sql = "INSERT INTO Ticket VALUES (?, timestamp '" + date.toString() + "', ?, ?, 'pending', ?)";
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setInt(1, id);
			ps.setDouble(2, amount);
			ps.setString(3, category);
			ps.setString(4, email);
			ps.executeUpdate();
			System.out.println("Ticket Successfully created.");
				
		} catch (SQLException | IOException e) {
			System.out.println("Ticket Failed to create.");
			e.printStackTrace();
			return false;
		}
		
		return created;
	}
	
	// Get ticket of user with email
	public ArrayList<Ticket> getTicketsOf(String email){
		ArrayList<Ticket> userTickets = new ArrayList<Ticket>();
		
		String sql = "SELECT * FROM Ticket WHERE Email = ? ORDER BY TDate DESC";	
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setString(1, email);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				int id = rs.getInt("Id");
				Timestamp date = rs.getTimestamp("TDate");
				double amount = rs.getDouble("Amount");
				String category = rs.getString("Category");
				String status = rs.getString("Status");
				String uemail = rs.getString("Email");
				
				Ticket tempTicket = new Ticket(id, date, amount, category, status, uemail);
				userTickets.add(tempTicket);
			}
			
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		return userTickets;
	}
	
	// Get All tickets
	public ArrayList<Ticket> getAllTickets(){
		ArrayList<Ticket> userTickets = new ArrayList<Ticket>();
		
		String sql = "SELECT * FROM Ticket";	
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				int id = rs.getInt("Id");
				Timestamp date = rs.getTimestamp("TDate");
				double amount = rs.getDouble("Amount");
				String category = rs.getString("Category");
				String status = rs.getString("Status");
				String uemail = rs.getString("Email");
				
				Ticket tempTicket = new Ticket(id, date, amount, category, status, uemail);
				userTickets.add(tempTicket);
			}
			
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		
		return userTickets;
	}
	
	
	
}
