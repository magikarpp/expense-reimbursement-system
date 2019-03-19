//// URL variables for AJAX calls
let employeeURL = "employee";
let ticketURL = "ticket";
let newTicketURL = "ticket/new";
let passwordURL = "manager/validate";

let currentUserEmail = document.getElementById("userEmail").innerHTML;

document.addEventListener("DOMContentLoaded", updateProfile);
document.getElementById("createTicketButton").addEventListener("click", createNewTicket);
document.getElementById("becomeManagerButton").addEventListener("click", checkManagerPassword);

let currentUser = {
		"email" : currentUserEmail,
		"name" : null,
		"password" : null,
		"ismanager" : 3,
		"reportsto" : null
	};

function updateProfile(){
	sendAjaxPost(employeeURL, updateProfileInfo, currentUser);
}

function createNewTicket(){
	let selected = document.getElementById("category");
	
	let ticket = {
		"id" : null,
		"date" : null,
		"amount" : document.getElementById("newTicketAmount").value,
		"category" : selected.options[selected.selectedIndex].text,
		"status" : "pending",
		"email" : currentUserEmail,
		"resolvedBy" : null,
	};
	
	document.getElementById("ticket-error").style = "color : orange";
	document.getElementById("ticket-error").innerHTML = "Creating Ticket...";
	
	sendAjaxPost(newTicketURL, newTicket, ticket);
}

function updateProfileInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	if(data[0].ismanager == 0){
		document.getElementById("isManager").innerHTML = "No";
		document.getElementById("beManagerButton").style = "";
		
		document.getElementById("changeView").style.display="none";
		document.getElementById("changeView").style.visibility="hidden";
	} else {		
		document.getElementById("isManager").innerHTML = "Yes";
	}
	
	if(data[0].reportsto == null){
		
		document.getElementById("userManagerEmail").innerHTML = "None";
		document.getElementById("userManager").innerHTML = "None";
	} else{
		document.getElementById("userManagerEmail").innerHTML = data[1].email;
		document.getElementById("userManager").innerHTML = data[1].name;
	}
	
}

function newTicket(xhr, ticket){
	let data = xhr.response;
	if(data == "success"){
		window.location.replace("edashboard");
	} else{
		document.getElementById("ticket-error").style = "color : red";
		document.getElementById("ticket-error").innerHTML = "Failed To Create Ticket";
	}
}

function checkManagerPassword(){
	let inputedPassword = document.getElementById("managerPassword").value;
	
	if(inputedPassword == "" || inputedPassword == undefined){
		document.getElementById("manager-error").style = "color: red";
		document.getElementById("manager-error").value = "Please input a valid password.";
	} else{
		document.getElementById("manager-error").style = "color : orange";
		document.getElementById("manager-error").innerHTML = "Validating Password...";
				
		let password = document.getElementById("managerPassword").value + " " + currentUserEmail;
		
		sendAjaxPost(passwordURL, managerPasswordResult, password);
	}
}

function managerPasswordResult(xhr, password){
	let data = xhr.response;
	
	if(data == "success"){
		window.location.replace("mdashboard");
	} else{
		document.getElementById("manager-error").style = "color : red";
		document.getElementById("manager-error").innerHTML = "Incorrect Manager Password. Please try again.";
	}
}

//global functions
function createSomething(tag, id, style, referenceNode){
	let created = document.createElement(tag);
	created.setAttribute("id", id);
	created.setAttribute("style", style);
	insertAfter(created, referenceNode);
}

function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


// AJAX Get call, with information.
function sendAjaxGet(url, callback, data){
    let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.HTTPRequest");
    xhr.open("GET", url);

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            callback(this, data);
        }
    }
    xhr.setRequestHeader("content-type", "text/plain");
    let jsonData = JSON.stringify(data);
    
    xhr.send(jsonData);
}

//AJAX POST call.
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

//// AJAX PUT call.
//function sendAjaxPut(url, callback, data){
//    let xhr = new XMLHttpRequest();
//    xhr.open("PUT", url);
//
//    xhr.onreadystatechange = function(){
//        if(this.readyState === 4 && this.status === 200){
//            callback(this);
//        }
//    }
//    xhr.setRequestHeader("content-type", "application/json");
//    let jsonData = JSON.stringify(data);
// 
//    xhr.send(jsonData);
//}
//
//// AJAX DELETE call.
//function sendAjaxDelete(url, callback, data){
//    let xhr = new XMLHttpRequest();
//    xhr.open("DELETE", url);
//
//    xhr.onreadystatechange = function(){
//        if(this.readyState === 4 && this.status === 200){
//            callback(this);
//        }
//    }
//    xhr.setRequestHeader("content-type", "application/json");
//    let jsonData = JSON.stringify(data);
// 
//    xhr.send(jsonData);
//}