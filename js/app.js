(function() {
	document.getElementById("chatBox").onkeyup = function (e) {
		if (e.which == 13) {
			addToList();
			return false;
		}
	};
})();

function addToList(){
	var chatBox = document.getElementById("chatBox");
	var list = document.getElementById("chatList");
	var entry = document.createElement("li");
	entry.innerHTML = chatBox.value;
	list.appendChild(entry);
	chatBox.value = "";
}