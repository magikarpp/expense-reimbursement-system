//// URL variables for AJAX calls
let employeeURL = "employee";
let ticketURL = "ticket";
let newTicketURL = "ticket/new";
let approveTicketURL = "ticket/approve";
let declineTicketURL = "ticket/decline";

let currentUserEmail = document.getElementById("userEmail").innerHTML;

document.addEventListener("DOMContentLoaded", updateTicket);


function updateTicket(){
	// For Info & Charts
	nothing = {};
	sendAjaxPost(ticketURL, updateTicketInfo, nothing);
}

function updateTicketInfo(xhr, nothing){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	// FOR INFORMATION 
	
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
		
		// Ticket Display
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
	
	if(data.length > 0){
		// FOR CHARTS and INFO
		let totalCount = data.length;
		let totalAmount = 0;
		let totalTravel = 0;
		let totalRec = 0;
		let totalFood = 0;
		let totalMisc = 0;
		let countApproved = 0;
		let countPending = 0;
		let countDeclined = 0;
		let minAmount = null;
		let maxAmount = 0;
		let pendingAmount = 0;
		let approvedAmount = 0;
		let declinedAmount = 0;
		
		for(i = 0; i < data.length; i++){
			currData = data[i];
			if(minAmount == null){
				minAmount = currData.amount;
			} else if(currData.amount < minAmount){
				minAmount = currData.amount;
			}
			
			if(currData.amount > maxAmount){
				maxAmount = currData.amount;
			}
			
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
				pendingAmount += currData.amount;
			} else if(currData.status == "approved"){
				countApproved += 1;
				approvedAmount += currData.amount;
			} else {
				countDeclined += 1;
				declinedAmount += currData.amount;
			}
		}
		
		// FOR INFO
		document.getElementById("totalTickets").innerHTML = totalCount;
		document.getElementById("pendingAmount").innerHTML = "$" + pendingAmount;
		document.getElementById("approvedAmount").innerHTML = "$" + approvedAmount;
		document.getElementById("declinedAmount").innerHTML = "$" + declinedAmount;
		document.getElementById("averageAmount").innerHTML = "$" + (totalAmount / totalCount).toFixed(2);
		document.getElementById("minAmount").innerHTML = "$" + minAmount;
		document.getElementById("maxAmount").innerHTML = "$" + maxAmount;
		
		
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
		
		for(i = 0; i < data.length; i++){
			chart0.options.data[0].dataPoints.push({x: new Date(data[i].date), y: data[i].amount});
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
		window.location.replace('/ers/mdashboard');
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