<!DOCTYPE html>
<html>
	<head>
	
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
		<meta content="utf-8" http-equiv="encoding">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<title>Manager</title>
		
		<!-- BootStrap CDN -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
		    crossorigin="anonymous">
		    
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
		    crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
		    crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
		    crossorigin="anonymous"></script>
		
		<link href="styles/style.css" rel="stylesheet">
	
	</head>

	<body>
	<%
	//allow access only if session exists
	String user = null;
	if(session.getAttribute("user") == null){
		response.sendRedirect("login");
	} else user = (String) session.getAttribute("user");
	%>

		 <div class="d-flex">
		 	<div class="bg-light border-right" id="sidebar-wrapper">
			   	<div class="sidebar-heading"></div>
				<div class="list-group list-group-flush">
					<a onclick="window.location.replace('/ers/edashboard');" class="list-group-item list-group-item-action bg-light">Dashboard</a>
					<a onclick="window.location.replace('/ers/mytickets');" class="list-group-item list-group-item-action bg-light">Tickets</a>
					<a onclick="window.location.replace('/ers/mymanager');" class="list-group-item list-group-item-action">Manager</a>
					<a onclick="window.location.replace('/ers/profile');" class="list-group-item list-group-item-action bg-light">Profile</a>
				</div>
		   </div>
		
		   <!-- PAGE -->
		   <div id="page-content-wrapper">
		   
			<!--  TOP NAVBAR -->
			<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
				<h5>Expense Reimbursement System <small>(Employee)</small></h5>
			
			  	<div class="collapse navbar-collapse top-navvy" id="navbarSupportedContent">
			    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
			      	<li class="nav-item dropdown">
			        	<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
			        	<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" onclick="document.getElementById('id01').style.display='block'">Create New Ticket</a>
							<form id="changeViewForm" action="mdashboard" method="GET">
								<a id="changeView" class="dropdown-item" onclick="document.getElementById('changeViewForm').submit();">Change View</a>
							</form>
							<div class="dropdown-divider"></div>
							<form id="logoutForm" action="logout" method="POST">
								<a class="dropdown-item" onclick="document.getElementById('logoutForm').submit();">Logout</a>
							</form>
			        	</div>
			      	</li>
			    </ul>
			  	</div>
			</nav>

			<!-- CREATE NEW TICKET MODAL -->
			<div id="id01" class="modal">
			  <div class="modal-content animate">
				  <form>
				    <div class="title-container">
				   	  <h4 class="text-center">Create New Ticket</h4>
				      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>	
				    </div>
				    <div class="form-group">
						<div class="container">
				              <div class="form-label-group">
				             	 <label for="amount"><b>Amount: *</b></label>
				                 <input type="number" id="newTicketAmount" class="form-control" placeholder="Enter Total Amount"  name="amount" min="0" required>
				              </div>
							  <br>
				              <div class="form-label-group">
								 <label for="category"><b>Category: *</b></label>
								 <select class="form-control" name="category" id="category" required>
							       <option>Travel</option>
							       <option>Recreation</option>
							       <option>Food</option>
							       <option>Miscellaneous</option>
							     </select>
							  </div>
							  <br>
							  <div class="form-label-group">
								 <label for="pic"><b>Receipt Picture: </b></label>
								 <input type="file" id="newTicketPicture" class="form-control" name="pic" accept="image/*">
					          </div>
					          
				        	  <div class="mb-3">
				        	  </div>
						 </div>
					 </div>
				  </form>
				  <div class="text-center">
		        	<span id="ticket-error" class="center-align"></span>
		      	 </div>
				  <button class="btn-primary text-uppercase" id="createTicketButton" type="button">Submit</button>
			  </div>
			</div>
			<!-- end of TICKET MODAL -->
			<!-- end of TOP NAVBAR -->
			
			
			<!-- MANAGER MODAL -->
			<div id="id02" class="modal">
			  <div class="modal-content animate">
				  <form>
				    <div class="title-container">
				   	  <h4 class="text-center">Evolve to Manager</h4>
				      <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>	
				    </div>
				    <div class="form-group">
						<div class="container">
				              <div class="form-label-group">
				             	 <label for="amount"><b>Password: *</b></label>
				                 <input type="password" id="managerPassword" class="form-control" placeholder="Enter Given Manager Password" required>
				              </div>
							  <br>
						 </div>
					 </div>
				  </form>
				  <div class="text-center">
		        	<span id="manager-error" class="center-align"></span>
		      	 </div>
				  <button class="btn-primary text-uppercase" id="becomeManagerButton" type="button">Submit</button>
			  </div>
			</div>
			<!-- end of MANAGER MODAL -->
			
			
			<!--  MAIN CONTENT -->
			<div class="container-fluid">
			
				<!-- MANAGER -->
				<h5 class="m-3">Your Manager</h5>
				<div class="card col-lg-9">
					<div class="box">
						<div class="column-split">
							<h6>Manager Email:</h6>
							<h6 id="userManagerEmail"></h6>
						</div>
						<div class="column-split">
							<h6>Manager:</h6>
							<h6 id="userManager"></h6>
						</div>
					</div>
				</div>
				
				<h5 class="m-3">My Manager Status</h5>
				<div class="card col-lg-9">
					<div class="box">
						<div class="column-split">
							<h6>Is Manager?</h6>
							<h6 id="isManager"></h6>
						</div>
					</div>
				</div>
				
				<div>
					<button class="btn m-3" id="beManagerButton" style="visibility: hidden; display: none" onclick="document.getElementById('id02').style.display='block'">Become Manager</button>
				</div>
				<!-- end of MANAGER -->
				
				<!-- FILLER -->
				<div id="ticketsRow" class="row">
				
				  <div id="ticket1" style="visibility : hidden" class="col-lg-3 col-md-4 col-sm-6 mb-4">
				    <div class="card h-50">
				      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
				      <div class="card-body">
				        <h5 class="card-title">
				          <a href="#">Filler Ticket</a>
				        </h5>
				        <p class="card-text">Filler</p>
				      </div>
					</div>
				  </div>
				  
				  <div id="ticket2" style="visibility : hidden" class="col-lg-3 col-md-4 col-sm-6 mb-4">
				    <div class="card h-50">
				      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
				      <div class="card-body">
				        <h5 class="card-title">
				          <a href="#">Filler Ticket</a>
				        </h5>
				        <p class="card-text">Filler</p>
				      </div>
					</div>
				  </div>
				  
				  <div id="ticket3" style="visibility : hidden" class="col-lg-3 col-md-4 col-sm-6 mb-4">
				    <div class="card h-50">
				      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
				      <div class="card-body">
				        <h5 class="card-title">
				          <a href="#">Filler Ticket</a>
				        </h5>
				        <p class="card-text">Filler</p>
				      </div>
					</div>
				  </div>
				  
				</div>
				<!-- end of FILLER -->
				
				<!-- FEEDER -->
				<div class="bottom-feeder">
					<p id="userEmail" hidden><%=user %></p>
				</div>
				<!-- end of FEEDER -->
				
			</div>
			<!-- end of MAIN CONTENT -->
			
		</div>
		<!-- end of PAGE -->
		
	 </div>
	
	<script src="js/EManagerJS.js"></script>
	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
	</body>

</html>