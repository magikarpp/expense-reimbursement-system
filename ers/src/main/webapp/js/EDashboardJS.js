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
	
	document.getElementById("userName").innerHTML = data[0].name;
	
	if(data[0].ismanager == 0){
		document.getElementById("changeView").style.display="none";
		document.getElementById("changeView").style.visibility="hidden";
	}
	
	if(data[0].reportsto == null){
		
		document.getElementById("userManagerEmail").innerHTML = "None";
		document.getElementById("userManager").innerHTML = "None";
	} else{
		document.getElementById("userManagerEmail").innerHTML = data[1].email;
		document.getElementById("userManager").innerHTML = data[1].name;
	}
	
}

function updateTicketInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	// FOR INFORMATION 
	document.getElementById("userTicketAmount").innerHTML = data.length;
	
	for(i = 0; i < data.length; i++){
		if(i == 3){
			break;
		}
		let ticketId = "ticket" + (i + 1);
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
	
	// FOR CHARTS
	let totalCount = data.length;
	let totalAmount = 0;
	let totalTravel = 0;
	let totalRec = 0;
	let totalFood = 0;
	let totalMisc = 0;
	let countApproved = 0;
	let countPending = 0;
	let countDeclined = 0;
	
	for(i = 0; i < data.length; i++){
		currData = data[i];
		if(currData.category == "Travel"){
			totalTravel += currData.amount;
		} else if(currData.category == "Recreation"){
			totalRec += currData.amount;
		} else if(currData.category == "Food"){
			totalFood += currData.amount;
		} else{
			totalMisc += currData.amount;
		}
		totalAmount += currData.amount;
		
		if(currData.status == "pending"){
			countPending += 1;
		} else if(currData.status == "approved"){
			countApproved += 1;
		} else {
			countDeclined += 1;
		}
	}
	
	//  chart0
	var chart0 = new CanvasJS.Chart("chartContainer0", {
		title: {
			text: "Spendings Timeline"
		},
		data: [{
			type: "line",
			yValueFormatString: "\"$\"##0.00",
			dataPoints: [
				
			]
		}]
    });
	
	let counter = totalAmount;
	for(i = 0; i < data.length; i++){
		counter -= data[i].amount;
		chart0.options.data[0].dataPoints.push({x: new Date(data[i].date), y: counter});
	}
	
    chart0.render();
	
    // chart1
	let chart1 = new CanvasJS.Chart("chartContainer1", {
		animationEnabled: true,
		title: {
			text: "Amount Spent By Category"
		},
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "\"$\"##0.00",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: totalTravel, label: "Travel"},
				{y: totalRec, label: "Recreation"},
				{y: totalFood, label: "Food"},
				{y: totalMisc, label: "Miscellaneous"}
			]
		}]
	});
	chart1.render();
	
	// chart2
	let chart2 = new CanvasJS.Chart("chartContainer2", {
		animationEnabled: true,
		title: {
			text: "Tickets By Status"
		},
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "\##0",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: countApproved, label: "Approved", color: "#6af441"},
				{y: countDeclined, label: "Declined", color: "#f44d41"},
				{y: countPending, label: "Pending", color: "#f4ad42"}
			]
		}]
	});
	chart2.render();
	
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