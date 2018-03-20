import("date");

<table class="matches styled">
	<tr>
		<th>"Winnaar"</th>
		<th>"Verliezer"</th>
		<th>"Datum"</th>
	</tr>

	for(var match of matches){
		<tr class="match">
			<td>match.WinnerName</td>
			<td>match.LoserName</td>
			<td class="date">formatDate(match.DatePlayed)</td>
		</tr>
	}
</table>