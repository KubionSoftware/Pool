function formatNumber(n: number, length: number): string{
	var s = n.toString();
	while(s.length < length){
		s = "0" + s;
	}
	return s;
}

function formatDate(date: Date): string{
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${formatNumber(date.getHours(), 2)}:${formatNumber(date.getMinutes(), 2)}`;
}