//// URL variables for AJAX calls
let employeeURL = "employee";
let ticketURL = "ticket";
let newTicketURL = "ticket/new";

let approveTicketURL = "ticket/approve";
let declineTicketURL = "ticket/decline";

let currentUserEmail = document.getElementById("userEmail").innerHTML;

document.addEventListener("DOMContentLoaded", updateTicket);

document.getElementById("search-button").addEventListener("click", searchTicket);
document.getElementById("all-tickets").addEventListener("click", updateTicket);
document.getElementById("approved-tickets").addEventListener("click", approvedTickets);
document.getElementById("pending-tickets").addEventListener("click", pendingTickets);
document.getElementById("declined-tickets").addEventListener("click", declinedTickets);

currentUser = {
		"email" : currentUserEmail,
		"name" : null,
		"password" : null,
		"ismanager" : null,
		"reportsto" : null
	};

let dummy = null;

function searchTicket(){
	searchUser = {
			"email" : document.getElementById("search").value,
			"name" : null,
			"password" : null,
			"ismanager" : null,
			"reportsto" : null
		};
	
	// For Info
	document.getElementById("all-tickets").className = "btn";
	document.getElementById("approved-tickets").className = "btn";
	document.getElementById("pending-tickets").className = "btn";
	document.getElementById("declined-tickets").className = "btn";
	
	sendAjaxPost(ticketURL, updateTicketInfo, searchUser);
}

function updateTicket(){
	// For Info
	document.getElementById("all-tickets").className = "btn btn-secondary";
	document.getElementById("approved-tickets").className = "btn";
	document.getElementById("pending-tickets").className = "btn";
	document.getElementById("declined-tickets").className = "btn";
	
	sendAjaxPost(ticketURL, updateTicketInfo, dummy);
}

function approvedTickets(){
	// For Info
	document.getElementById("all-tickets").className = "btn";
	document.getElementById("approved-tickets").className = "btn btn-secondary";
	document.getElementById("pending-tickets").className = "btn";
	document.getElementById("declined-tickets").className = "btn";
	
	sendAjaxPost(ticketURL, approvedTicketsInfo, dummy);
}

function pendingTickets(){
	// For Info
	document.getElementById("all-tickets").className = "btn";
	document.getElementById("approved-tickets").className = "btn";
	document.getElementById("pending-tickets").className = "btn btn-secondary";
	document.getElementById("declined-tickets").className = "btn";
	
	sendAjaxPost(ticketURL, pendingTicketsInfo, dummy);
}

function declinedTickets(){
	// For Info
	document.getElementById("all-tickets").className = "btn";
	document.getElementById("approved-tickets").className = "btn";
	document.getElementById("pending-tickets").className = "btn";
	document.getElementById("declined-tickets").className = "btn btn-secondary";
	
	sendAjaxPost(ticketURL, declinedTicketsInfo, dummy);
}


function updateTicketInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	document.getElementById("ticketsRow").innerHTML = "";
	
	for(i = 0; i < data.length; i++){
		let ticketId = "ticket" + (i + 1);
		
		document.getElementById("ticketsRow").innerHTML += "<div id=" + ticketId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>";
		document.getElementById(ticketId).setAttribute("style", "");
		
		let statusStyle = "";
		
		if(data[i].status == "approved"){
			statusStyle = "color : green";
		} else if(data[i].status == "declined"){
			statusStyle = "color : red";
		} else if(data[i].status == "pending"){
			statusStyle = "color : orange";
		} else{ }
		
		let resolvedBy = "<p class=\"card-text\">Resolved By: " + data[i].resolvedBy + "</p> ";
		if(data[i].resolvedBy == null) resolvedBy = "";
		
		let showStyle = "visibility : hidden; display : none";
		if(data[i].status == "pending"){
			showStyle = "";
		}
		
		document.getElementById(ticketId).innerHTML =
		"<div class=\"card h-100\"> " +
			"<img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"> " +
				"<div class=\"card-body\"> " +
					"<h5 class=\"card-title\"> " +
						"<p style=\"color : darkturquoise\"\">Ticket ID: " + data[i].id + "</p> " +
					"</h5> " +
					"<p class=\"card-text\" style=\"" + statusStyle + "\">" + data[i].status + "</p> " +
					"<p class=\"card-text\">Employee: " + data[i].email + "</p> " +
					"<p class=\"card-text\">Date: " + new Date(data[i].date).toLocaleString() + "</p> " +
					"<p class=\"card-text\">Amount: $" + data[i].amount + "</p> " +
					"<p class=\"card-text\">Category: " + data[i].category + "</p> " +
					resolvedBy +
					"<button onclick=\"approveTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"approveButton\" type=\"button\">Approve</button>" +
					"<button onclick=\"declineTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"declineButton\" type=\"button\">Decline</button>" +
				"</div> </div>";
	}
	
}

function approvedTicketsInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	document.getElementById("ticketsRow").innerHTML = "";
	
	for(i = 0; i < data.length; i++){
		if(data[i].status == "approved"){
			let ticketId = "ticket" + (i + 1);
			
			document.getElementById("ticketsRow").innerHTML += "<div id=" + ticketId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>";
			document.getElementById(ticketId).setAttribute("style", "");
			
			let statusStyle = "";
			
			if(data[i].status == "approved"){
				statusStyle = "color : green";
			} else if(data[i].status == "declined"){
				statusStyle = "color : red";
			} else if(data[i].status == "pending"){
				statusStyle = "color : orange";
			} else{ }
			
			let resolvedBy = "<p class=\"card-text\">Resolved By: " + data[i].resolvedBy + "</p> ";
			if(data[i].resolvedBy == null) resolvedBy = "";
			
			let showStyle = "visibility : hidden; display : none";
			if(data[i].status == "pending"){
				showStyle = "";
			}
			
			document.getElementById(ticketId).innerHTML =
			"<div class=\"card h-100\"> " +
				"<img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"> " +
					"<div class=\"card-body\"> " +
						"<h5 class=\"card-title\"> " +
							"<p style=\"color : darkturquoise\"\">Ticket ID: " + data[i].id + "</p> " +
						"</h5> " +
						"<p class=\"card-text\" style=\"" + statusStyle + "\">" + data[i].status + "</p> " +
						"<p class=\"card-text\">Employee: " + data[i].email + "</p> " +
						"<p class=\"card-text\">Date: " + new Date(data[i].date).toLocaleString() + "</p> " +
						"<p class=\"card-text\">Amount: $" + data[i].amount + "</p> " +
						"<p class=\"card-text\">Category: " + data[i].category + "</p> " +
						resolvedBy +
						"<button onclick=\"approveTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"approveButton\" type=\"button\">Approve</button>" +
						"<button onclick=\"declineTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"declineButton\" type=\"button\">Decline</button>" +
					"</div> </div>";
		}
	}
	
}

function pendingTicketsInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	document.getElementById("ticketsRow").innerHTML = "";
	
	for(i = 0; i < data.length; i++){
		if(data[i].status == "pending"){
			let ticketId = "ticket" + (i + 1);
			
			document.getElementById("ticketsRow").innerHTML += "<div id=" + ticketId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>";
			document.getElementById(ticketId).setAttribute("style", "");
			
			let statusStyle = "";
			
			if(data[i].status == "approved"){
				statusStyle = "color : green";
			} else if(data[i].status == "declined"){
				statusStyle = "color : red";
			} else if(data[i].status == "pending"){
				statusStyle = "color : orange";
			} else{ }
			
			let resolvedBy = "<p class=\"card-text\">Resolved By: " + data[i].resolvedBy + "</p> ";
			if(data[i].resolvedBy == null) resolvedBy = "";
			
			let showStyle = "visibility : hidden; display : none";
			if(data[i].status == "pending"){
				showStyle = "";
			}
			
			document.getElementById(ticketId).innerHTML =
			"<div class=\"card h-100\"> " +
				"<img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"> " +
					"<div class=\"card-body\"> " +
						"<h5 class=\"card-title\"> " +
							"<p style=\"color : darkturquoise\"\">Ticket ID: " + data[i].id + "</p> " +
						"</h5> " +
						"<p class=\"card-text\" style=\"" + statusStyle + "\">" + data[i].status + "</p> " +
						"<p class=\"card-text\">Employee: " + data[i].email + "</p> " +
						"<p class=\"card-text\">Date: " + new Date(data[i].date).toLocaleString() + "</p> " +
						"<p class=\"card-text\">Amount: $" + data[i].amount + "</p> " +
						"<p class=\"card-text\">Category: " + data[i].category + "</p> " +
						resolvedBy +
						"<button onclick=\"approveTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"approveButton\" type=\"button\">Approve</button>" +
						"<button onclick=\"declineTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"declineButton\" type=\"button\">Decline</button>" +
					"</div> </div>";
		}
	}
	
}

function declinedTicketsInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	document.getElementById("ticketsRow").innerHTML = "";
	
	for(i = 0; i < data.length; i++){
		if(data[i].status == "declined"){
			let ticketId = "ticket" + (i + 1);
			
			document.getElementById("ticketsRow").innerHTML += "<div id=" + ticketId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>";
			document.getElementById(ticketId).setAttribute("style", "");
			
			let statusStyle = "";
			
			if(data[i].status == "approved"){
				statusStyle = "color : green";
			} else if(data[i].status == "declined"){
				statusStyle = "color : red";
			} else if(data[i].status == "pending"){
				statusStyle = "color : orange";
			} else{ }
			
			let resolvedBy = "<p class=\"card-text\">Resolved By: " + data[i].resolvedBy + "</p> ";
			if(data[i].resolvedBy == null) resolvedBy = "";
			
			let showStyle = "visibility : hidden; display : none";
			if(data[i].status == "pending"){
				showStyle = "";
			}
			
			document.getElementById(ticketId).innerHTML =
			"<div class=\"card h-100\"> " +
				"<img class=\"card-img-top\" src=\"http://placehold.it/700x400\" alt=\"\"> " +
					"<div class=\"card-body\"> " +
						"<h5 class=\"card-title\"> " +
							"<p style=\"color : darkturquoise\"\">Ticket ID: " + data[i].id + "</p> " +
						"</h5> " +
						"<p class=\"card-text\" style=\"" + statusStyle + "\">" + data[i].status + "</p> " +
						"<p class=\"card-text\">Employee: " + data[i].email + "</p> " +
						"<p class=\"card-text\">Date: " + new Date(data[i].date).toLocaleString() + "</p> " +
						"<p class=\"card-text\">Amount: $" + data[i].amount + "</p> " +
						"<p class=\"card-text\">Category: " + data[i].category + "</p> " +
						resolvedBy +
						"<button onclick=\"approveTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"approveButton\" type=\"button\">Approve</button>" +
						"<button onclick=\"declineTicket(" + data[i].id + ")\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"declineButton\" type=\"button\">Decline</button>" +
					"</div> </div>";
		}
	}	
	
}

function approveTicket(ticketId){
	let ticketAndEmail = ticketId + " " + currentUserEmail;
	sendAjaxPost(approveTicketURL, ticketStatus, ticketAndEmail);
}

function declineTicket(ticketId){
	let ticketAndEmail = ticketId + " " + currentUserEmail;
	sendAjaxPost(declineTicketURL, ticketStatus, ticketAndEmail);
}

function ticketStatus(xhr, ticketId){
	let data = xhr.response;
	
	if(data == "success"){
		window.location.replace('/ers/mtickets');
	} else{
		console.log(data);
		document.getElementById("ticket-error").style = "color : red";
		document.getElementById("ticket-error").innerHTML = "Error Processing Ticket..."
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