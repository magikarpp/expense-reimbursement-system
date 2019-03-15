//// URL variables for AJAX calls
let loginURL = "login";

// Create EventListeners 	
document.getElementById("loginButton").addEventListener("click", loginValidate);

function loginValidate() {
	
	console.log("Validating Login...");
	
	validateEmployee = {
		"email" : document.getElementById("inputEmail").value,
		"name" : "filler",
		"password" : document.getElementById("inputPassword").value,
		"reportsto" : "NULL"
	};
	
	document.getElementById("login-error").style = "color : orange";
	document.getElementById("login-error").innerHTML = "Signing In...";
	sendAjaxPost(loginURL, checkSuccess, validateEmployee);

}

function checkSuccess(xhr, validateEmployee){
	let data = xhr.response;
	console.log("checking for Success...");
	if(data == "success"){
		console.log("success");
		window.location.replace("edashboard");
	} else{
		console.log(data);
		document.getElementById("login-error").style = "color : red";
		document.getElementById("login-error").innerHTML = "Email/Password combination does not match. Please try again.";
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
