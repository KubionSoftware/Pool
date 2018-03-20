import("rating");

var renderPlayerSelect = function(name, players){
	<select name="#name#">
		<option disabled selected value="">"Selecteer speler"</option>
		for(var player of players){
			<option value="#player.Name#">player.Name</option>
		}
	</select>
};

if(request.path[1] == "create"){
	var rows = SQL.execute("Data", `
		SELECT winner.ID AS winnerID, winner.Rating AS winnerRating, loser.ID AS loserID, loser.Rating AS loserRating 
		FROM Player winner, Player loser 
		WHERE winner.Name = '${request.params.winner}' 
		AND loser.Name = '${request.params.loser}'
	`);
	var data = rows[0];

	var newRatings = calculateRating(data.winnerRating, data.loserRating);

	SQL.execute("Data", `
		INSERT INTO Match (Winner, Loser) VALUES (${data.winnerID}, ${data.loserID});
		UPDATE Player SET Rating = ${newRatings[0]} WHERE ID = ${data.winnerID};
		UPDATE Player SET Rating = ${newRatings[1]} WHERE ID = ${data.loserID};
	`);
	redirect("../matches");
}else{
	var players = SQL.execute("Data", "SELECT Name From Player ORDER BY Name");

	<form action="matches/create" method="get">
		<table>
			<tr>
				<td>"Winnaar"</td>
				<td>renderPlayerSelect("winner", players)</td>
			</tr>
			<tr>
				<td>"Verliezer"</td>
				<td>renderPlayerSelect("loser", players)</td>
			</tr>
			<tr>
				<td colspan="2"><button type="submit">"Toevoegen"</button></td>
			</tr>
		</table>
	</form>
	
	var matches = SQL.execute("Data", "SELECT TOP 100 pw.Name AS WinnerName, pl.Name AS LoserName, DatePlayed FROM Match JOIN Player pw ON pw.ID = Match.Winner JOIN Player pl ON pl.ID = Match.Loser ORDER BY Match.DatePlayed DESC");
	include("matchTable", {matches: matches});
}