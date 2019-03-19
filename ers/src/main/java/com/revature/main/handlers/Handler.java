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
			PreparedStatement ps = con.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();){
			
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
	
	public boolean updateEmployee(String email, Employee employee) {
		boolean updated = true;
		
		if(employeeExists(email)) {
			if(email.equals(employee.getEmail())) {
				String sql1 = "UPDATE Employee SET Email = ?, Name = ?, IsManager = ?, ReportsTo = ? WHERE Email = ?";
				
				try(Connection con = ConnectionUtil.getConnectionFromFile();
					PreparedStatement ps = con.prepareStatement(sql1);){
					
					ps.setString(1, employee.getEmail());
					ps.setString(2, employee.getName());
					ps.setInt(3, employee.getIsmanager());
					ps.setString(4, employee.getReportsto());
					ps.setString(5, email);
					ps.executeUpdate();
						
				} catch (SQLException e) {
					updated = false;
					e.printStackTrace();
				} catch (IOException e1) {
					updated = false;
					e1.printStackTrace();
				}
			} else {
				if(!employeeExists(employee.getEmail())) {
					String sql = "INSERT INTO Employee VALUES (?, ?, ?, ?, ?)";
					
					try(Connection con = ConnectionUtil.getConnectionFromFile();
						PreparedStatement ps = con.prepareStatement(sql);){
						
						ps.setString(1, employee.getEmail());
						ps.setString(2, employee.getName());
						ps.setString(3, employee.getPassword());
						ps.setInt(4, employee.getIsmanager());
						ps.setString(5, employee.getReportsto());
						ps.executeUpdate();
							
					} catch (SQLException | IOException e) {
						updated = false;
						e.printStackTrace();
					}
					
					if(updated) {
						String sql1 = "UPDATE Ticket SET Email = ? WHERE Email = ?";
						
						try(Connection con = ConnectionUtil.getConnectionFromFile();
							PreparedStatement ps = con.prepareStatement(sql1);){
							
							ps.setString(1, employee.getEmail());
							ps.setString(2, email);
							ps.executeUpdate();
							 	
						} catch (SQLException e) {
							updated = false;
							e.printStackTrace();
						} catch (IOException e1) {
							updated = false;
							e1.printStackTrace();
						}
						
						String sql2 = "DELETE FROM Employee WHERE Email = ?";
						
						try(Connection con = ConnectionUtil.getConnectionFromFile();
							PreparedStatement ps = con.prepareStatement(sql2);){
							
							ps.setString(1, email);
							ps.executeUpdate();
								
						} catch (SQLException | IOException e) {
							updated = false;
							e.printStackTrace();
						}
					}
				} else {
					updated = false;
				}
			}
		}
		
		return updated;
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
			PreparedStatement ps = con.prepareStatement(sql0);
			ResultSet rs = ps.executeQuery();){
			
				while(rs.next()) {
					id = rs.getInt("Top") + 1;
				}
			
				
		} catch (SQLException | IOException e) {
			System.out.println("Ticket Failed to create.");
			e.printStackTrace();
			return false;
		}
		
		String sql = "INSERT INTO Ticket VALUES (?, timestamp '" + date.toString() + "', ?, ?, 'pending', ?, NULL)";
		
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
			
			try(ResultSet rs = ps.executeQuery();){
				while(rs.next()) {
					int id = rs.getInt("Id");
					Timestamp date = rs.getTimestamp("TDate");
					double amount = rs.getDouble("Amount");
					String category = rs.getString("Category");
					String status = rs.getString("Status");
					String uemail = rs.getString("Email");
					String resolvedBy = rs.getString("ResolvedBy");
					
					Ticket tempTicket = new Ticket(id, date, amount, category, status, uemail, resolvedBy);
					userTickets.add(tempTicket);
				}
			}
			
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
			PreparedStatement ps = con.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();){
			
			while(rs.next()) {
				int id = rs.getInt("Id");
				Timestamp date = rs.getTimestamp("TDate");
				double amount = rs.getDouble("Amount");
				String category = rs.getString("Category");
				String status = rs.getString("Status");
				String uemail = rs.getString("Email");
				String resolvedBy = rs.getString("ResolvedBy");
				
				Ticket tempTicket = new Ticket(id, date, amount, category, status, uemail, resolvedBy);
				userTickets.add(tempTicket);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		
		return userTickets;
	}
	
	public boolean validateManagerPassword(String password) {
		boolean match = false;
		
		String sql = "SELECT Password FROM ManagerPassword";	
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();){
			
			String realPassword = "";
			
			while(rs.next()) {
				realPassword = rs.getString("Password");
			}
			
			if(realPassword.equals(password)) {
				match = true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return match;
	}
	
	public boolean changeToManager(String email) {
		boolean changed = false;
		
		boolean exists = employeeExists(email);
		
		if(exists) {
			String sql = "UPDATE Employee SET IsManager = 1 WHERE Email = ?";
			
			try(Connection con = ConnectionUtil.getConnectionFromFile();
				PreparedStatement ps = con.prepareStatement(sql);){
				
				ps.setString(1, email);
				ps.executeUpdate();
				changed = true;
					
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		
		return changed;
		
	}
	
	public boolean isManager(String email) {
		boolean manager = false;
		Employee tempEmployee = null;
		
		if(this.employeeExists(email)) {
			tempEmployee = this.getEmployeeByEmail(email);
			
			if(tempEmployee.getIsmanager() == 1) {
				manager = true;
			}
		}
		
		return manager;
	}
	
	public boolean approveTicket(int ticketId, String email) {
		boolean approved = false;
		
		String sql = "UPDATE Ticket SET status = 'approved', ResolvedBy = ? WHERE id = ?";
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setString(1, email);
			ps.setInt(2, ticketId);
			ps.executeUpdate();
			approved = true;
				
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return approved;
	}
	
	public boolean declineTicket(int ticketId, String email) {
		boolean declined = false;
		
		String sql = "UPDATE Ticket SET status = 'declined', ResolvedBy = ? WHERE id = ?";
		
		try(Connection con = ConnectionUtil.getConnectionFromFile();
			PreparedStatement ps = con.prepareStatement(sql);){
			
			ps.setString(1, email);
			ps.setInt(2, ticketId);
			ps.executeUpdate();
			declined = true;
				
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return declined;
	}
	
}
