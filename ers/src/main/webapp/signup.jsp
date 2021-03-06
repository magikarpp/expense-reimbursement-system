<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8" />
	    <title>Sign Up</title>
	
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    
	    <link rel="stylesheet" href="">
	    <!-- BootStrap CDN -->
	    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
	        crossorigin="anonymous">
	    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
	        crossorigin="anonymous"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
	        crossorigin="anonymous"></script>
	    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
	        crossorigin="anonymous"></script>
	</head>
	<body>
	
	<%
	//allow access only if session does not exist
	String user = null;
	if(session.getAttribute("user") != null){
		response.sendRedirect("edashboard");
	}
	%>
	
		<div class="container">
			<h2 class="text-center my-5">Expense Reimbursement System</h2>
		    <div class="row">
		      <div class="col-md-7 col-lg-5 mx-auto">
		        <div class="card card-signin my-4">
		          <div class="card-body">
		            <h5 class="card-title text-center">Sign Up</h5>
		            <form class="form-signup">
		              <div class="form-label-group">
		             	<label for="inputEmail">Email address</label>
		                <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
		              </div>
		              
		              <div class="form-label-group">
		             	<label for="inputName">Name</label>
		                <input type="text" name="name" id="inputName" class="form-control" placeholder="Name" required>
		              </div>
		
		              <div class="form-label-group">
		              	<label for="inputPassword">Password</label>
		                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
		              </div>
		              
		              <div class="form-label-group">
		              	<label for="inputPassword1">Confirm Password</label>
		                <input type="password" name="password1" id="inputPassword1" class="form-control" placeholder="Confirm Password" required>
		              </div>
		              
		        	  <div class="mb-3">
		        	  </div>
	             	 </form>
	             	 <button class="btn btn-lg btn-primary btn-block text-uppercase" id="signupButton" type="button">Sign Up</button>
	             	 <hr class="my-4">
	             	 <p><sub>Already have an account?</sub></p>
		             <button class="btn btn-block text-uppercase" onclick="window.location.replace('http://localhost:8080/ers/login');" type="submit">Login</button>
		          </div>
		        </div>
		        
		        <div class="text-center">
		        	<span id="signup-error" class="center-align" style="color: red"></span>
		        </div>
		        
		      </div>
		    </div>
		  </div>
		<script src="js/signupJS.js"></script>
	</body>
	
</html>