(function() {
	document.getElementById("chatBox").onkeyup = function (e) {
		if (e.which == 13 && document.getElementById("chatBox").value.length > 0) {
			postMessage("pass", document.getElementById("chatBox").value);
			return false;
		}
	};
})();

function updateChatList() {
	var list = document.getElementById("chatList");
	list.innerHTML = "";
	for(var i = 0; i < messages.length; i++) {
		var message = messages[i];
		
		var userDiv = document.createElement("div");
		userDiv.innerHTML = message.owner;
		userDiv.className = "user";
		var messageDiv = document.createElement("div");
		messageDiv.className = "message";
		messageDiv.innerHTML = message.message;
		
		var li = document.createElement("li");
		li.appendChild(userDiv);
		li.appendChild(messageDiv);
		list.appendChild(li);
	}
}

var messages = [];
var ourHash = "";

function fetchMessages() {
	httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", "http://168.61.52.247/messages/fetch", true);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == XMLHttpRequest.DONE) {
			if (httpRequest.state = 200) {
				res = JSON.parse(messages = httpRequest.responseText);
				if (res.length > 0) {
					var newMessages = [];
					for(var m = 0; m < res.length; m++) {
						var newMessage = res[m];
						skip = false;
						for(var i = 0; i < messages.length; i++) {
							if (messages[i].id == newMessage.id) {
								skip = true;
							}
						}
						if (skip == false) {
							newMessages.push(newMessage);
						}
					}
					messages = newMessages;
					updateChatList();
				}
			} else {
				alert(JSON.parse(httpRequest.responseText).message);
			}
		}
	}
	
	httpRequest.send(JSON.stringify({
		lat: 70,
		lon: 40,
		dist: 3,
		tag: "default"
	}));
}

function postMessage(user, text) {
	httpRequest = new XMLHttpRequest();
	httpRequest.open("POST", "http://168.61.52.247/messages/send", true);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == XMLHttpRequest.DONE) {
			res = JSON.parse(messages = httpRequest.responseText);
			if (httpRequest = 200) {
				ourHash = res.hash; 
				document.getElementById("chatBox").value = "";
				fetchMessages();
			} else {
				alert(res.message);
			}
		}
	}
	httpRequest.send(JSON.stringify({
		lat: 70,
		lon: 40,
		dist: 3,
		message: text,
		user: user,
		tags: "default"
	}));
}