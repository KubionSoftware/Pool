var players = SQL.execute("Data", `
	SELECT 
		Player.*, 
		(SELECT COUNT(*) FROM Match WHERE Player.ID = Match.Winner) AS WinCount, 
		(SELECT COUNT(*) FROM Match WHERE Player.ID = Match.Loser) AS LoseCount 
	FROM Player 
	WHERE Player.ID = ${id}
`);
var player = players[0]
var total = player.WinCount + player.LoseCount;
var winPercentage = player.WinCount / total * 100;
var losePercentage = player.LoseCount / total * 100;

<h1>player.Name</h1>

<table>
	<tr>
		<td>"Gespeeld"</td>
		<td>total</td>
	</tr>
	<tr>
		<td>"Gewonnen"</td>
		<td>player.WinCount + "(" + Math.round(winPercentage) + "%)"</td>
	</tr>
	<tr>
		<td>"Verloren"</td>
		<td>player.LoseCount + "(" + Math.round(losePercentage) + "%)"</td>
	</tr>
</table>

include("ratingGraph", {id: id});

var matches = SQL.execute("Data", `SELECT pw.Name AS WinnerName, pl.Name AS LoserName, DatePlayed FROM Match JOIN Player pw ON pw.ID = Match.Winner JOIN Player pl ON pl.ID = Match.Loser WHERE Match.Winner = ${id} OR Match.Loser = ${id} ORDER BY Match.DatePlayed DESC`);
include("matchTable", {matches: matches});