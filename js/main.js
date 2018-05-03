var sub = document.getElementById("register");
var subject;
var main = document.getElementById("test");
var controls = document.getElementById("buttons");
var counter = 0;
var score;
var questions;


sub.addEventListener("click", function(event) {
	event.preventDefault();
	subject = document.getElementById("subjects").value;
	//validateForm();
	storeUser();
	clearDiv();
	getTest(subject);
	//createNext();
	// displayNext();
});

//validates the form: user cant register empty fields
function validateForm() {
	var n = document.forms["user"]["name"].value;
	var m = document.forms["user"]["matno"].value;
	
    if (n == "" || m == "") {
		alert("Please fill in your information");
		return false;  
	} 
}

// stores the users information to local(session) storage
function storeUser() {
	var name = document.getElementById("name").value;
	var matNo = document.getElementById("matno").value;
	

	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		sessionStorage.setItem("name", name);
		sessionStorage.setItem("matno", matNo);
		sessionStorage.setItem("subject", subject);	
	} else {
		// Sorry! No Web Storage support..
		alert("Your browser does not have Web Storage support");
	}	
}

// clears the page(after user info is stored)
function clearDiv() {
	document.getElementById("test").innerHTML = "";		
}

function getData(result) { 
	var xhttp = new XMLHttpRequest();
	xhttp.overrideMimeType("application/json");
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			result(xhttp.responseText);
			}
		
	};
	xhttp.open("GET", "test.json", true);
	xhttp.send();
}

function getTest(subject) {
	var a = ""; var b = ""; var c = ""; var q = "";
	getData(function (obj) {
		result = JSON.parse(obj);
		questions = result.subjects[subject];
				// for (i=0; i < result.subjects[subject].length; i++) {
					
				// }
			document.getElementById("title").innerHTML = subject + " Test";

			q += "<h3 id='quest'>" + questions[counter].question + "</h3>";	
			a += "<input type='radio' id='one'>" + questions[counter].options[0] + "</input>" + "<br>";
			b += "<input type='radio' id='two'>" + questions[counter].options[1] + "</input>" + "<br>";
			c += "<input type='radio' id='three'>" + questions[counter].options[2] + "</input>";
						
			main.innerHTML =  q + a + b + c;
				
						
	});
	createNext();
}

function createNext() {
	var next = document.createElement("input");
	next.setAttribute('type', "submit");
	next.setAttribute('value', "Next");
	next.setAttribute('id', "next")
	controls.appendChild(next);

	
}

function createPrev() {
	var next = document.createElement("input");
	next.setAttribute('type', "submit");
	next.setAttribute('value', "Prev");
	next.setAttribute('id', "prev")
	controls.appendChild(next);
}

function displayNext() {
	
	
}

next.addEventListener("click", displayNext());