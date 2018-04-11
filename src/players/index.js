if(request.path[1] == "create"){
	SQL.execute("Data", SQL.format("INSERT INTO Player (Name) VALUES ({name})", {
		name: request.params.name
	}));
	redirect("../players");
}else if(request.path.length > 1){
	var id = parseInt(request.path[1]);
	include("players/player", {id: id});
}else{
	include("players/index.html");
}