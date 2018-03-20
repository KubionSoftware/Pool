<html>
	<head>
		<base href="#Config.host#"/>
		<link href="style/style.css" rel="stylesheet"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<meta name="mobile-web-app-capable" content="yes"/>
		<meta name="apple-mobile-web-app-capable" content="yes"/>

		// Fix for safari web app
		<script>`(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace(e.href,"").indexOf("#")&&(!/^[a-z\\+\\.\\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");`</script>
	</head>

	<body>
		<div class="header">
			<a href="players">"Spelers"</a>
			<a href="matches">"Wedstrijden"</a>
		</div>

		<div class="content">
			// If app is hosted under /pool then remove pool from the path
			if(request.path[0] == "pool"){
				request.path.splice(0, 1);
			}

			if(request.path[0] == "players"){
				include("players", {request: request});
			}else if(request.path[0] == "matches"){
				include("matches", {request: request});
			}else{
				redirect("pool/players");
			}
		</div>
	</body>
</html>