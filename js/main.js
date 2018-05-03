var name = document.getElementById("name").value;
var matNo = document.getElementById("matno").value;
var subject = document.getElementById("subjects");


var main = document.getElementById("test");
var obj;
//var correct = document.getElementById("one").value;
//var one = document.getElementById("one").value;
//var two = document.getElementById("two").value;
//var three = document.getElementById("three").value;

//var options = [ one, two, three];
var score; 
var picked;


// stores the users information to local(session) storage
function storeUser() {
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		sessionStorage.setItem("name", name);
		sessionStorage.setItem("matno", matNo);
		sessionStorage.setItem("subject", subject.value);
		
	} else {
		// Sorry! No Web Storage support..
		alert("Your browser does not have Web Storage support");
	}	
}

// clears the page(after user info is stored)
function clearPage() {
	document.getElementById("buttons").innerHTML= "";
	document.getElementById("test").innerHTML = "";
	
}

//adds event listener for the register button(events to take palce after user clicks)
document.getElementById("register").addEventListener("click", function() {
	storeUser();
	// clearPage();
	// changeQuestion();
	
});

// creates the test page
function createTest() {
	var question = document.createElement("h3");
	var node = document.createTextNode(obj.subjects.biology.q1.question);
	question.appendChild(node);

	// var next = document.createElement("input");
	// next.setAttribute('type', "submit");
	// next.setAttribute('value', "Next");

	// var opts = document.createElement("input");
	// opts.setAttribute('type', "radio");
	// opts.setAttribute('name', "options");
	


	// var opt1 = document.createElement("label");
	// opt1.innerHTML = obj.subjects.biology.q1.options[0];
	// opts.appendChild(opt1);
	
	var nav = document.getElementById("buttons");
	nav.appendChild(next);
	main.appendChild(question);
	// main.appendChild(opts);
	
	

}

// changes the question 
function changeQuestion() {
	var xhttp = new XMLHttpRequest();
	xhttp.overrideMimeType("application/json");
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			obj = JSON.parse(this.response);
			//getData();
			console.log(obj.subjects);
	        console.log(subject.value);
		}
		
	};
	xhttp.open("GET", "test.json", true);
	xhttp.send();
}

function getData() {
	
	var a = ""; var b = ""; var c = ""; 
	

	for (i in obj) {
		 
		a += "<input type='radio' id='one'>" + obj.subjects.biology.q1.options[0] + "</input>" + "<br>";
		b += "<input type='radio' id='two'>" + obj.subjects.biology.q1.options[1] + "</input>" + "<br>";
		c += "<input type='radio' id='three'>" + obj.subjects.biology.q1.options[2] + "</input>";

		
		main.innerHTML =  a + b + c;
	}

	createTest();
	
}



function getAnswer() {
	var picked;
	for (i = 0; i < options.length; i++) {
		if (options[i].checked) {
			 picked = options[i].value;
			break;
		}
	}
}


// document.getElementById("send").addEventListener("click", function() {


// 	if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
//     if (picked == correct) {
//     	score = 1;
//     	sessionStorage.setItem("question", "picked");
//     } else {
//     	score = 1;
//     	sessionStorage.setItem("question", "picked");
//     }
// } else {
//     // Sorry! No Web Storage support..
//     alert("Your browser does not have Web Storage support");
// }


// }); 




