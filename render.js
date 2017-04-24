if (typeof jQuery == 'undefined') {  
	document.write('<div id="nroc-member-map" style="width:578px; height:371px;">no jquery sorry</div>');
} else {
	document.write('<div id="nroc-member-map" style="width:578px; height:371px;">yes jquery awesome</div>');
}

	try{
		h = document.getElementsByTagName('head')[0];
	    var q = document.createElement('script');
		q.src = 'http://code.jquery.com/jquery-1.7.1.min.js';
		q.type = 'text/javascript';
		q.id = "jqueryelement";
		h.appendChild(q);
	} catch (e){
		alert(e);
	}