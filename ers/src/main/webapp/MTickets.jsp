<!DOCTYPE html>
<html>
	<head>
	
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<title>Tickets</title>
		
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
					<a onclick="window.location.replace('/ers/mdashboard');" class="list-group-item list-group-item-action bg-light">Dashboard</a>
					<a onclick="window.location.replace('/ers/mtickets');" class="list-group-item list-group-item-action">Tickets</a>
					<a onclick="window.location.replace('/ers/memployee');" class="list-group-item list-group-item-action bg-light">Employees</a>
				</div>
		   </div>
		
		   <!-- PAGE -->
		   <div id="page-content-wrapper">
		   
			<!--  TOP NAVBAR -->
			<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
				<h5>Expense Reimbursement System <small>(Manager)</small></h5>
			
			  	<div class="collapse navbar-collapse top-navvy" id="navbarSupportedContent">
			    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
			      	<li class="nav-item dropdown">
			        	<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
			        	<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
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
			<!-- end of TOP NAVBAR -->
			
			<!--  MAIN CONTENT -->
			<div class="container-fluid">
			
				<!-- TICKETS -->
				<div class="ticket-container">
					<h5 class="mt-4" id="ticket-title">Tickets</h5>
					<div class="m-2">
						<button id="all-tickets" class="btn btn-secondary">All</button>
						<button id="approved-tickets" class="btn">Approved</button>
						<button id="pending-tickets" class="btn">Pending</button>
						<button id="declined-tickets" class="btn">Declined</button>
						<label class="ml-5" for="search">Search By Email:</label>
						<input type=email id="search">
						<button id="search-button">Search</button>
					</div>
					<div id="ticketsRow" class="row">
					  
					</div>
				</div>
				<!-- end of TICKETS -->
				
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
	
	<script src="js/MTicketsJS.js"></script>
	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
	</body>

</html>