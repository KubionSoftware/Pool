var players = SQL.execute("Data", `
	SELECT 
		Player.*, 
		(SELECT COUNT(*) FROM Match WHERE Player.ID = Match.Winner) AS WinCount, 
		(SELECT COUNT(*) FROM Match WHERE Player.ID = Match.Loser) AS LoseCount 
	FROM Player 
	WHERE Player.ID = ${id}
`);
var player = players[0];
var total = player.WinCount + player.LoseCount;

include("players/player.html", {
	player: player, 
	total: total, 
	winPercentage: player.WinCount / total * 100, 
	losePercentage: player.LoseCount / total * 100
});

include("ratingGraph", {id: id});
include("timeGraph", {id: id});

var matches = SQL.execute("Data", `SELECT pw.Name AS WinnerName, pl.Name AS LoserName, DatePlayed FROM Match JOIN Player pw ON pw.ID = Match.Winner JOIN Player pl ON pl.ID = Match.Loser WHERE Match.Winner = ${id} OR Match.Loser = ${id} ORDER BY Match.DatePlayed DESC`);
include("matches/table.html", {matches: matches});