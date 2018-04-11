var query = "SELECT DATEPART(HOUR, DatePlayed) AS hour, COUNT(*) AS count FROM Match ";
if(id){
	query += SQL.format("WHERE Winner = {id} OR Loser = {id} ", {id: id});
}
query += "GROUP BY (DATEPART(HOUR, DatePlayed));";

var data = SQL.execute("Data", query);
var labels = data.map(row => row.hour + ":00");
var graph = data.map(row => row.count);
include("timeGraph.html", {labels: labels, graph: graph});