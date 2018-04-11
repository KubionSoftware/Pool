import("rating");

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
	var matches = SQL.execute("Data", "SELECT TOP 100 pw.Name AS WinnerName, pl.Name AS LoserName, DatePlayed FROM Match JOIN Player pw ON pw.ID = Match.Winner JOIN Player pl ON pl.ID = Match.Loser ORDER BY Match.DatePlayed DESC");
	include("matches/index.html", {players: players});
	include("matches/table.html", {matches: matches});
}