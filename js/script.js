var start = document.getElementById("start");
var main = document.getElementById("test");
var subject, name, matNo; 
var score = 0;
var questions;
var counter = 0;
var picked;
var i;



start.addEventListener("click", function(event) {
	event.preventDefault();
	subject = document.getElementById("subjects").value;
	//validateForm();
	storeUser();
	clearDiv();
	getTest(subject, counter);
	// createNext();
	//displayNext();
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

function createQuestion() {
	var quest = document.createElement("h3");
	quest.setAttribute("id", "quest");
	var txt = document.createTextNode( questions[counter].question);
	quest.appendChild(txt);
	main.appendChild(quest);
}

function createOptions() {
	for (var j=0; j < questions[counter].options.length; j++) {
		
		var radio = document.createElement("input");
		radio.setAttribute("type", "radio");
		radio.setAttribute("name", "options");
		radio.setAttribute("value", ""+ questions[counter].options[j] + "");
		
		var opt = document.createElement("div");
		opt.setAttribute("id", "choices")
		var ltxt = document.createTextNode( questions[counter].options[j]);
		opt.appendChild(radio);
		opt.appendChild(ltxt);
		main.appendChild(opt);
	}
	
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
		createQuestion();
		createOptions();
	
		if(counter === 0 ) {
			next.style.display = "inline";
			
		} else if(counter < questions.length) {
			prev.style.display = "inline";
		} 
	});
}

next.addEventListener("click", function() {
	getAnswer();
	
	clearDiv();
	counter++;
	
	if (counter < questions.length - 1) {
		getTest(subject, counter);
		prev.style.visibility = "visible";
		
	} else {
		getTest(subject, counter);
		next.style.display = "none";
		prev.style.display = "none";
		done.style.display = "inline";

	}
});


prev.addEventListener("click", function() {	
	clearDiv();
	counter--;
		
	if (counter === 0 ) {
		getTest(subject, counter);
		prev.style.display = "none";
		done.style.display = "none";
	} else {
		getTest(subject, counter);
			
	}
});

done.addEventListener("click", function() {
	getAnswer();	
	displayScore();
	again.style.display = "inline";
	prev.style.display = "none";
	done.style.display = "none";
});
	
again.addEventListener("click", function() {
	clearDiv();
	counter = 0;
	getTest(subject, counter);
	again.style.display = "none";		
});

function displayScore() {
	main.innerHTML = "<h3>" + sessionStorage.getItem("name", name) + " with Matric No " + sessionStorage.getItem("matno", matNo) + ", your score is " + score + " out of " + questions.length + "</h3";
}
function getAnswer() {
	questions[counter].userAnswer = document.querySelector('input[name="options"]:checked').value;
	picked = questions[counter].userAnswer;

	if(picked == questions[counter].answer) {
		score++;
	}
	//sessionStorage.setItem("answer", answer);
}


function timer() {

}