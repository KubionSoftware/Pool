import("rating");

var history = SQL.execute("Data", "SELECT * FROM Match");
var ratings = {};
var graph = [500];
var labels = [0];
for(var match of history){
	if(!(match.Winner in ratings)) ratings[match.Winner] = 500;
	if(!(match.Loser in ratings)) ratings[match.Loser] = 500;

	var newRatings = calculateRating(ratings[match.Winner], ratings[match.Loser]);
	ratings[match.Winner] = newRatings[0];
	ratings[match.Loser] = newRatings[1];

	if(match.Winner == id){
		graph.push(newRatings[0]);
		labels.push(labels.length);
	}else if(match.Loser == id){
		graph.push(newRatings[1]);
		labels.push(labels.length);
	}
}

include("ratingGraph.html", {labels: labels, graph: graph});