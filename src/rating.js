var calculateRating = function(r1: number, r2: number): number[] {
	var R1 = Math.pow(10, r1 / 400);
	var R2 = Math.pow(10, r2 / 400);

	var E1 = R1 / (R1 + R2);
	var E2 = R2 / (R1 + R2);

	var S1 = 1;
	var S2 = 0;

	var K = 32;

	var newR1 = r1 + K * (S1 - E1);
	var newR2 = r2 + K * (S2 - E2);

	return [newR1, newR2];
};