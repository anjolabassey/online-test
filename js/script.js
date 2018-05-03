var sub = document.getElementById("register");
var subject;
var main = document.getElementById("test");
var controls = document.getElementById("buttons");
var counter = 0;
var score;
var questions;
var i;
var a = ""; var b = ""; var c = ""; var q = "";


sub.addEventListener("click", function(event) {
	event.preventDefault();
	subject = document.getElementById("subjects").value;
	//validateForm();
	storeUser();
	clearDiv();
	getTest(subject, counter);
	createNext();
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
	main.innerHTML = "";		
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

function getTest(subject, counter) {
	
	getData(function (obj) {
		result = JSON.parse(obj);
		questions = result.subjects[subject];
			
		document.getElementById("title").innerHTML = subject + " Test";
		

			
				q = "<h3 id='quest'>" + questions[counter].question + "</h3>";	
			a = "<input type='radio' id='one'>" + questions[counter].options[0] + "</input>" + "<br>";
			b = "<input type='radio' id='two'>" + questions[counter].options[1] + "</input>" + "<br>";
			c = "<input type='radio' id='three'>" + questions[counter].options[2] + "</input>";
			main.innerHTML =  q + a + b + c;
			
			
			
						
	});
}

function createNext() {
	var next = document.createElement("input");
	next.setAttribute('type', "submit");
	next.setAttribute('value', "Next");
	next.setAttribute('id', "next")
	controls.appendChild(next);

	
	next.addEventListener("click", function() {
		clearDiv();
		counter++;
		console.log(counter);
		console.log(questions);
		if (counter < questions.length - 1) {
		getTest(subject, counter);
		} else {
			getTest(subject, counter);
			next.remove();
			createDone();
		}
		
	});
	
}

function createPrev() {
	var prev = document.createElement("input");
	prev.setAttribute('type', "submit");
	prev.setAttribute('value', "Prev");
	prev.setAttribute('id', "prev")
	controls.appendChild(prev);
}

function createDone() {
	var done = document.createElement("input");
	done.setAttribute('type', "submit");
	done.setAttribute('value', "Done");
	done.setAttribute('id', "done")
	controls.appendChild(done);
	
	done.addEventListener("click", function() {
		main.innerHTML = "<h3>" + "Ade, your score is 0 out of 5" + "</h3";
		done.remove();
	});
}



function displayNext() {
	
	
}

function getAnswer() {
	
}

