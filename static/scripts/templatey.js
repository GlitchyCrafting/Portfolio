function exec_script(elem) {
	if (elem.nodeName.toLowerCase() !== "script") {
		return;
	}

	var file = elem.getAttribute("src");

	if (file !== null) {
		fetch(file, {
			headers: {
				"Content-Type": "text/javascript",
			}
		}).then((res) => {
			return res.text();
		}).then((text) => {
			eval(text);
		});
	}

	eval(elem.innerHTML);
};

function load_template(name, replace = null) {
	var site = window.location.origin;
	if (site == null || site == "null") { site = ""; }
	var path = site + "Portfolio/templates/" + String(name) + ".html";

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState !== 4) return;
		if (this.status !== 200) return;
;
		var content = this.responseText;

		if (replace !== null) {
			replace.insertAdjacentHTML("afterend", content);
			var elem = replace.nextElementSibling;
			replace.remove();

			var children = elem.children;
			for (var i = 0; i < elem.childElementCount; i++) {
				exec_script(children[i]);
			}
		}
		else {
			return content;
		}
	};
	xhr.open('GET', path, true);
	xhr.send();
}
