function nav(url) {
	return "window.location.href = '" + url + "'";
}

var nav_links = document.getElementsByClassName("nav-link");
for (var i = 0; i < nav_links.length; i++) {
	nav_links[i].setAttribute("onclick", nav(nav_links[i].getAttribute("url")));
}
