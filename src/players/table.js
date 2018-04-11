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

for(var i = 0; i < players.length; i++){
	include("players/row.html", {player: players[i], rank: i + 1});
}