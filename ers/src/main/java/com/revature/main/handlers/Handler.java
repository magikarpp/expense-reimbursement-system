package com.revature.main.handlers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.revature.main.models.Employee;

public class Handler {
	
	public Employee getEmployeeByEmail(String email) {
		Employee tempEmployee = null;
		
		String sql = "SELECT * FROM Employee WHERE Email = ?";	
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setString(1, email);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				String eemail = rs.getString("Email");
				String username = rs.getString("Username");
				String password = rs.getString("Password");
				tempEmployee = new Employee(eemail, username, password);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return tempEmployee;
	}
	
	public boolean validateLogin(String email, String password) {
		Employee tempEmployee = getEmployeeByEmail(email);
		boolean valid = true;
		if(tempEmployee.equals(null)) valid = false;
		if(!tempEmployee.getPassword().equals(password)) valid = false;
		return valid;
	}

	public boolean createEmployee(String email, String username, String password) {
		String sql = "INSERT INTO Employee VALUES (?, ?, ?)";
		int employeeUpdated = 0;
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setString(1, email);
			ps.setString(2, username);
			ps.setString(3, password);
			employeeUpdated = ps.executeUpdate();
			System.out.println("Sign Up Successful");
				
		} catch (SQLException | IOException e) {
			System.out.println("Sign Up Failed");
			e.printStackTrace();
		}
		if(employeeUpdated > 0) return true;
		else return false;
	}
}
