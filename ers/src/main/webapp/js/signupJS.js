//// URL variables for AJAX calls
let signupURL = "signup";

// Create EventListeners 	
document.getElementById("signupButton").addEventListener("click", signupValidate);

function signupValidate() {
	
	if(document.getElementById("inputPassword").value == document.getElementById("inputPassword1").value){
		console.log("inserting new user...");
		
		newEmployee = {
			"email" : document.getElementById("inputEmail").value,
			"name" : document.getElementById("inputName").value,
			"password" : document.getElementById("inputPassword").value,
			"ismanager" : 0,
			"reportsto" : "NULL"
		};
		
		document.getElementById("signup-error").style = "color : orange";
		document.getElementById("signup-error").innerHTML = "Creating Account...";
		sendAjaxPost(signupURL, checkSuccess, newEmployee);
		
	} else{
		document.getElementById("signup-error").style = "color : red";
		document.getElementById("signup-error").innerHTML = "Passwords do not match, please try again.";
	}
}

function checkSuccess(xhr, newEmployee){
	let data = xhr.response;
	console.log("checking for Success...");
	if(data == "success"){
		console.log("success");
		document.getElementById("signup-error").style = "color : green";
		document.getElementById("signup-error").innerHTML = "Account Successfully Created!";
	} else{
		console.log(data);
		document.getElementById("signup-error").style = "color : red";
		document.getElementById("signup-error").innerHTML = "Email already in use, please try again.";
	}
}

// AJAX POST call.
function sendAjaxPost(url, callback, data){
    let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.HTTPRequest");
    xhr.open("POST", url);

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            callback(this, data);
        }
    }
    xhr.setRequestHeader("content-type", "text/plain");
    let jsonData = JSON.stringify(data);
 
    xhr.send(jsonData);
}
