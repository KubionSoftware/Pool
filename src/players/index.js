Log.write(path);
if(path[1] == "create"){
	SQL.execute("Data", SQL.format("INSERT INTO Player (Name) VALUES ({name})", {
		name: Request.getParameter("name")
	}));
	redirect("../players");
}else if(path.length > 1){
	var id = parseInt(path[1]);
	include("players/player", {id: id});
}else{
	include("players/index.html");
}