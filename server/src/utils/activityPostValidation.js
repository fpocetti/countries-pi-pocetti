const activityPostValidation = (name, difficulty, duration, seasons) => {
	//season normalization
	const validSeasons = ['Winter', 'Summer', 'Spring', 'Autumn'];
	const userSeasons = [];

	seasons.forEach((season) => {
		if (validSeasons.includes(season)) {
			userSeasons.push(season);
		}
		return userSeasons;
	});

	//name normalization
	const nameToUpperCase = name.toUpperCase();

	//difficulty normalization
	const difficultyInt = parseInt(difficulty);

	//duration normalization
	const durationFloat = parseFloat(duration);

	return (response = {
		name: nameToUpperCase,
		difficulty: difficultyInt,
		duration: durationFloat,
		seasons: userSeasons,
	});
};

module.exports = activityPostValidation;
