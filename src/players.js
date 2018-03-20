if(request.path[1] == "create"){
	SQL.insert("Data", "Player", {
		Name: request.params.name
	});
	redirect("../players");
}else if(request.path.length > 1){
	var id = parseInt(request.path[1]);
	include("player", {id: id});
}else{
	<form action="players/create" method="get">
		<table>
			<tr>
				<td>"Naam: "</td>
				<td><input type="text" name="name"/></td>
			</tr>
			<tr>
				<td colspan="2"><button type="submit">"Aanmaken"</button></td>
			</tr>
		</table>
	</form>

	var players = SQL.execute("Data", `
		SELECT 
			Player.ID, 
			Player.Name, 
			Player.Rating, 
			(SELECT COUNT(*) FROM Match WHERE Player.ID = Match.Winner) AS WinCount,
			(SELECT COUNT(*) FROM Match WHERE Player.ID = Match.Winner OR Player.ID = Match.Loser) AS MatchCount 
		FROM Player 
		ORDER BY Rating DESC
	`);
	<table class="styled players">
		<tr>
			<th>"#"</th>
			<th>"Naam"</th>
			<th>"Rating"</th>
			<th>"%"</th>
		</tr>

		for(var i = 0; i < players.length; i++){
			var player = players[i];

			<tr class="player" onclick="document.location.href='players/#player.ID#'">
				<td>i + 1</td>
				<td>player.Name</td>
				<td class="rating">Math.round(player.Rating)</td>
				<td>Math.round(player.WinCount / player.MatchCount * 100)</td>
			</tr>
		}
	</table>
}