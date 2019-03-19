//// URL variables for AJAX calls
let employeeURL = "employee";
let ticketURL = "ticket";
let newTicketURL = "ticket/new";
let beManagerURL = "manager/become";

let currentUserEmail = document.getElementById("userEmail").innerHTML;

document.addEventListener("DOMContentLoaded", updateEmployee);

document.getElementById("search-button").addEventListener("click", searchEmployee);
document.getElementById("all-employees-button").addEventListener("click", updateEmployee);
document.getElementById("my-employees-button").addEventListener("click", myEmployee);

currentUser = {
		"email" : currentUserEmail,
		"name" : null,
		"password" : null,
		"ismanager" : null,
		"reportsto" : null
	};

let dummy = null;

function searchEmployee(){
	searchUser = {
			"email" : document.getElementById("search").value,
			"name" : null,
			"password" : null,
			"ismanager" : null,
			"reportsto" : null
		};
	
	// For Info
	document.getElementById("all-employees-button").className = "btn";
	document.getElementById("my-employees-button").className = "btn";
	
	sendAjaxPost(employeeURL, searchedUserInfo, searchUser);
}

function updateEmployee(){
	// For Info
	document.getElementById("all-employees-button").className = "btn btn-secondary";
	document.getElementById("my-employees-button").className = "btn";
	document.getElementById("search").value = "";
	
	sendAjaxPost(employeeURL, updateEmployeeInfo, dummy);
}

function myEmployee(){
	// For Info
	document.getElementById("all-employees-button").className = "btn";
	document.getElementById("my-employees-button").className = "btn btn-secondary";
	document.getElementById("search").value = "";
	
	sendAjaxPost(ticketURL, myEmployeeInfo, dummy);
}

function searchedUserInfo(xhr, something){
	let data = JSON.parse(xhr.response);
	
	document.getElementById("employeeRow").innerHTML = "";
	
	for(i = 0; i < 1; i++){
		let employeeId = "employee" + (i + 1);
		
		document.getElementById("employeeRow").innerHTML += "<div id=" + employeeId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>";
		document.getElementById(employeeId).setAttribute("style", "");
		
		let showStyle = "";
		let reportsTo;
		let isManager = "No";
		
		if(data[i].ismanager == 1){
			isManager = "Yes";
		}
		
		if(data[i].reportsto == currentUserEmail || data[i].email == currentUserEmail){
			showStyle = "visibility : hidden; display : none;";
		}
		
		if(data[i].reportsto != null || data[i].reportsto != undefined){
			reportsTo = data[i].reportsto;
		} else{
			reportsTo = "None";
		}
		
		console.log("<button onclick=\"becomeManagerOf('" + data[i].email + "')\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"becomeManagerOfButton\" type=\"button\">Obtain Soul</button>");
		
		document.getElementById(employeeId).innerHTML =
		"<div class=\"card h-100\"> " +
			"<div class=\"card-body\"> " +
				"<h5 class=\"card-title\"> " +
					"<p style=\"color : darkturquoise\"\">" + data[i].name + "</p> " +
				"</h5> " +
				"<p class=\"card-text\">Email: " + data[i].email + "</p> " +
				"<p class=\"card-text\">Reports To: " + reportsTo + "</p> " +
				"<p class=\"card-text\">Is Manager? " + isManager + "</p> " +
				"<button onclick=\"becomeManagerOf('" + data[i].email + "')\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"becomeManagerOfButton\" type=\"button\">Obtain Soul</button>" +
			"</div> </div>";
	}
}


function updateEmployeeInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.email > b.email;
	});
	
	document.getElementById("employeeRow").innerHTML = "";
	
	for(i = 0; i < data.length; i++){
		let employeeId = "employee" + (i + 1);
		
		document.getElementById("employeeRow").innerHTML += "<div id=" + employeeId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>";
		document.getElementById(employeeId).setAttribute("style", "");
		
		let showStyle = "";
		let reportsTo;
		let isManager = "No";
		
		if(data[i].ismanager == 1){
			isManager = "Yes";
		}
		
		if(data[i].reportsto == currentUserEmail || data[i].email == currentUserEmail){
			showStyle = "visibility : hidden; display : none;";
		}
		
		if(data[i].reportsto != null || data[i].reportsto != undefined){
			reportsTo = data[i].reportsto;
		} else{
			reportsTo = "None";
		}
		
		console.log("<button onclick=\"becomeManagerOf('" + data[i].email + "')\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"becomeManagerOfButton\" type=\"button\">Obtain Soul</button>");
		
		document.getElementById(employeeId).innerHTML =
		"<div class=\"card h-100\"> " +
			"<div class=\"card-body\"> " +
				"<h5 class=\"card-title\"> " +
					"<p style=\"color : darkturquoise\"\">" + data[i].name + "</p> " +
				"</h5> " +
				"<p class=\"card-text\">Email: " + data[i].email + "</p> " +
				"<p class=\"card-text\">Reports To: " + reportsTo + "</p> " +
				"<p class=\"card-text\">Is Manager? " + isManager + "</p> " +
				"<button onclick=\"becomeManagerOf('" + data[i].email + "')\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"becomeManagerOfButton\" type=\"button\">Obtain Soul</button>" +
			"</div> </div>";
	}
	
}

function myEmployeeInfo(xhr, currentUser){
	let data = JSON.parse(xhr.response);
	
	data.sort(function (a, b) {
	    return a.date < b.date;
	});
	
	document.getElementById("employeeRow").innerHTML = "";
	
	for(i = 0; i < data.length; i++){
		if(data[i].reportsto == currentUserEmail){
		
			let employeeId = "employee" + (i + 1);
			
			document.getElementById("employeeRow").innerHTML += "<div id=" + employeeId + " style=\"visibility : hidden\" class=\"col-lg-3 col-md-4 col-sm-6 mb-4\"></div>";
			document.getElementById(employeeId).setAttribute("style", "");
			
			let showStyle = "";
			let reportsTo;
			let isManager = "No";
			
			if(data[i].ismanager == 1){
				isManager = "Yes";
			}
			
			if(data[i].reportsto == currentUserEmail || data[i].email == currentUserEmail){
				showStyle = "visibility : hidden; display : none;";
			}
			
			if(data[i].reportsto != null || data[i].reportsto != undefined){
				reportsTo = data[i].reportsto;
			} else{
				reportsTo = "None";
			}
			
			console.log("<button onclick=\"becomeManagerOf('" + data[i].email + "')\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"becomeManagerOfButton\" type=\"button\">Obtain Soul</button>");
			
			document.getElementById(employeeId).innerHTML =
			"<div class=\"card h-100\"> " +
				"<div class=\"card-body\"> " +
					"<h5 class=\"card-title\"> " +
						"<p style=\"color : darkturquoise\"\">" + data[i].name + "</p> " +
					"</h5> " +
					"<p class=\"card-text\">Email: " + data[i].email + "</p> " +
					"<p class=\"card-text\">Reports To: " + reportsTo + "</p> " +
					"<p class=\"card-text\">Is Manager? " + isManager + "</p> " +
					"<button onclick=\"becomeManagerOf('" + data[i].email + "')\" class=\"btn m-1\" style=\"" + showStyle + "\" id=\"becomeManagerOfButton\" type=\"button\">Obtain Soul</button>" +
				"</div> </div>";
		}
	}
	
}



function becomeManagerOf(email){
	console.log("we get to the function becomeManagerOf");
	let goonAndYou = email + " " + currentUserEmail;
	sendAjaxPost(beManagerURL, soulAction, goonAndYou);
}

function soulAction(xhr, something){
	let data = xhr.response;
	
	if(data == "success"){
		window.location.replace('/ers/memployee');
	} else{
		console.log(data);
		document.getElementById("ticket-error").style = "color : red";
		document.getElementById("ticket-error").innerHTML = "Error Obtaining Soul...";
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