$(function() {
  const path = window.location.pathname;
  if (path.endsWith("map.html")) {
	$('html').toggleClass('no_scroll');
	$('main').toggleClass('map');
  }
});