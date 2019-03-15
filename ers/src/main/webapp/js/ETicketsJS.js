//// URL variables for AJAX calls
let employeeURL = "employee";
let ticketURL = "ticket";
let newTicketURL = "ticket/new";

let currentUserEmail = document.getElementById("userEmail").innerHTML;

document.addEventListener("DOMContentLoaded", updateProfile);
document.addEventListener("DOMContentLoaded", updateTicket);
document.getElementById("createTicketButton").addEventListener("click", createNewTicket);

currentUser = {
		"email" : currentUserEmail,
		"name" : null,
		"password" : null,
		"ismanager" : null,
		"reportsto" : null
	};

function updateProfile(){
	sendAjaxPost(employeeURL, updateProfileInfo, currentUser);
}

function updateTicket(){
	// For Info
	sendAjaxPost(ticketURL, updateTicketInfo, currentUser);
}

function updateProfileInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	if(data[0].ismanager == 0){
		document.getElementById("changeView").style.display="none";
		document.getElementById("changeView").style.visibility="hidden";
	}
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

function updateTicketInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	if(data.length == 0){
		document.getElementById("ticketsRow").innerHTML =
			"<div style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\">"
			"<div class=\"card h-100\"> " +
				"<img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"> " +
					"<div class=\"card-body\"> " +
						"<h5 class=\"card-title\"> " +
							"<p style=\"color : darkturquoise\"\">Ticket ID: </p> " +
						"</h5> " +
						"<p class=\"card-text\" style=\"" + statusStyle + "\"> </p> " +
						"<p class=\"card-text\">Date: </p> " +
						"<p class=\"card-text\">Amount: $ </p> " +
						"<p class=\"card-text\">Category: </p> " +
					"</div> </div> </div>";
	} else{
		for(i = 0; i < data.length; i++){
			let ticketId = "ticket" + (i + 1);
			document.getElementById("ticketsRow").innerHTML += "<div id=" + ticketId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>"
			document.getElementById(ticketId).setAttribute("style", "");
			
			let statusStyle = "";
			
			if(data[i].status == "approved"){
				statusStyle = "color : green";
			} else if(data[i].status == "declined"){
				statusStyle = "color : red";
			} else if(data[i].status == "pending"){
				statusStyle = "color : orange";
			} else{ }
			
			document.getElementById(ticketId).innerHTML =
			"<div class=\"card h-100\"> " +
				"<img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"> " +
					"<div class=\"card-body\"> " +
						"<h5 class=\"card-title\"> " +
							"<p style=\"color : darkturquoise\"\">Ticket ID: " + data[i].id + "</p> " +
						"</h5> " +
						"<p class=\"card-text\" style=\"" + statusStyle + "\">" + data[i].status + "</p> " +
						"<p class=\"card-text\">Date: " + new Date(data[i].date).toLocaleString() + "</p> " +
						"<p class=\"card-text\">Amount: $" + data[i].amount + "</p> " +
						"<p class=\"card-text\">Category: " + data[i].category + "</p> " +
					"</div> </div>";
		}
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