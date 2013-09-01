/**
 * A simple noauth parser.
 */

var noAuth = {};

/**
 * Fetches info for noAuth blocks (any element with a data-noauth attribte)
 * and updates child elements of that block accordingly.
 */
noAuth.update = function(){
	$('*[data-noauth]').each(function(){
		var container = this;
		var url = $(this).data('noauth');
		$.getJSON(url + "?callback=?", function(response){
			var noAuthInfo = response[0];
			// Example noAuthInfo structure to expect
			// var noAuthInfo = {
			//     "Name": "Iain Collins",
			//     "Image": "http://iaincollins.com/images/me.jpg",
			//     "Website": "http://iaincollins.com",
			//     "Email": "me@iaincollins.com",
			//     "Twitter:": "iaincollins",
			//     "Facebook:": "iain.collins.169",
			//     "Interests": [
			//         "software", "video games", "cats"
			//     ]
			// };
			$('*[data-noauth-value]', container).each(function(){
				var noAuthValue = $(this).data('noauth-value');	
				// Loop through all data-noauth-value attrs also in the response
				if (noAuthInfo[noAuthValue]) {
 				    if (noAuthValue == "Image") {
						var imageUrl = noAuthInfo[noAuthValue];
						// Images are a special case
						// If height specified, pass it as a size along with 
						// the request (uses 's' for size, like Gravatar).
						if ($(this).attr('height')) {
							// If the URL already has a query string param
							// (?) then it adds one with &
							if (imageUrl.indexOf("?") > -1) {
								imageUrl += '&s='+$(this).attr('height');
							} else {
								imageUrl += '?s='+$(this).attr('height');
							}							
						}
						$(this).attr('src', imageUrl);
					} else {
						$(this).text(noAuthInfo[noAuthValue]);
					}
				}
			});
		});
	});
	$(document).trigger('noAuthUpdateComplete');
}

// Trigger update on page load
$(function(){
	noAuth.update();
});