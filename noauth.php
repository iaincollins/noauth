<?php
	/**
	 * Example oAuth server-side script. Returns JSON noauth object
	 * (wrapped as JSONP, if a callback parameter is passed).
	 */
	$callback = null;
	if (isset($_REQUEST['callback']))
		$callback = $_REQUEST['callback'];

	// Wrap in JSONP if callback provided
	if ($callback != null)
		echo $callback.'([';
?>{
    "Name": "Iain Collins",
	"Image": "http://iaincollins.com/images/me.jpg",
    "Website": "http://iaincollins.com",
    "Email": "me@iaincollins.com",
    "Twitter": "iaincollins",
    "Facebook": "iain.collins.169",
    "Interests": [
        "software", "video games", "cats"
    ]
}<?php 
	// Terminate JSONP wrapping if callback provided
	if ($callback != null)
		echo '])';
?>