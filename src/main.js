var path = context.request.path;

// If app is hosted under /pool then remove pool from the path
if(path[0] == "pool"){
	path.splice(0, 1);
}

var content = null;

while(true){
	try{
		content = load(path.join("/") + (path.length > 0 ? "/" : "") + "index.js", {request: context.request});
		break;
	}catch(e){
		Log.write(e);
		if(path.length == 0) break;
		path = path.slice(0, path.length - 1);
	}
}

return include("layout.html", {host: Config.host, content: content});