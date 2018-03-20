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

<canvas id="myChart" width="400" height="200"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.js"></script>
<script>`
	var ctx = document.getElementById("myChart").getContext("2d");
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ${JSON.stringify(labels)},
			datasets: [{
				label: "Rating",
				data: ${JSON.stringify(graph)},
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				backgroundColor: "rgb(75, 192, 192)",
				lineTension: 0.4
			}]
		},
		options: {}
	});
`</script>