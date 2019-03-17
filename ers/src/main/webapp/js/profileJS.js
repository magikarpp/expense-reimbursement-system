//// URL variables for AJAX calls
let employeeURL = "employee";
let ticketURL = "ticket";
let newTicketURL = "ticket/new";
let updateEmployeeURL = "employee/update"

let currentUserEmail = document.getElementById("userEmail").innerHTML;

document.addEventListener("DOMContentLoaded", updateProfile);
document.getElementById("createTicketButton").addEventListener("click", createNewTicket);
document.getElementById("editInfoButton").addEventListener("click", editInfoAjax);
document.getElementById("submitInfo").addEventListener("click", submitInfo);
document.getElementById("cancelInfo").addEventListener("click", cancelInfo);

currentUser = {
		"email" : currentUserEmail,
		"name" : null,
		"password" : null,
		"ismanager" : 3,
		"reportsto" : null
	};

function editInfoAjax(){
	sendAjaxPost(employeeURL, editInfo, currentUser);
}

function editInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	document.getElementById("editInfoButton").style = "visiblity: hidden; display: none;";
	document.getElementById("submitInfo").style = "";
	document.getElementById("cancelInfo").style = "";
	
	document.getElementById("newEmail").style = "";
	document.getElementById("newName").style = "";
	document.getElementById("newEmail").value = data[0].email;
	document.getElementById("newName").value = data[0].name;
	
	document.getElementById("userNameInfo").style = "visiblity: hidden; display: none;";
	document.getElementById("userEmailInfo").style = "visiblity: hidden; display: none;";
}

function cancelInfo(){
	window.location.replace('/ers/profile');
}

function submitInfo(){
	updateUser = {
		"email" : document.getElementById("newEmail").value,
		"name" : document.getElementById("newName").value,
		"password" : currentUserEmail,
		"ismanager" : 3,
		"reportsto" : null
	};
	
	document.getElementById("update-error").style = "color : orange";
	document.getElementById("update-error").innerHTML = "Updating Info...";
	
	sendAjaxPost(updateEmployeeURL, updatedInfo, updateUser);
}

function updatedInfo(xhr, user){
	let data = xhr.response;
	
	if(data == "success"){
		document.getElementById("logoutForm").submit();
	} else{
		console.log(data);
		document.getElementById("update-error").style = "color : red";
		document.getElementById("update-error").innerHTML = "Email already in use. Please try again.";
	}
}

function updateProfile(){
	sendAjaxPost(employeeURL, updateProfileInfo, currentUser);
}

function updateTicket(){
	// For Info & Charts
	sendAjaxPost(ticketURL, updateTicketInfo, currentUser);
}

function createNewTicket(){
	let selected = document.getElementById("category");
	
	ticket = {
		"id" : null,
		"date" : null,
		"amount" : document.getElementById("newTicketAmount").value,
		"category" : selected.options[selected.selectedIndex].text,
		"status" : "pending",
		"email" : currentUserEmail
	};
	
	document.getElementById("ticket-error").style = "color : orange";
	document.getElementById("ticket-error").innerHTML = "Creating Ticket...";
	
	sendAjaxPost(newTicketURL, newTicket, ticket);
}

function updateProfileInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	document.getElementById("userNameInfo").innerHTML = data[0].name;
	
	if(data[0].ismanager == 0){
		document.getElementById("isManager").innerHTML = "No";
		
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
	let data = xhr.response
	console.log(data);
	if(data == "success"){
		window.location.replace("edashboard");
	} else{
		document.getElementById("ticket-error").style = "color : red";
		document.getElementById("ticket-error").innerHTML = "Failed To Create Ticket";
	}
}

//global functions
function createSomething(tag, id, referenceNode){
	let created = document.createElement(tag);
	created.setAttribute("id", id);
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