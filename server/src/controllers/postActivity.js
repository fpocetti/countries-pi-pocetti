const { Activity } = require('../db');

const postActivity = async (req, res) => {
	//creates a new entry in Activity model
	const { name, difficulty, duration, season } = req.body;
	const newActivity = {
		name,
		difficulty,
		duration,
		season,
	};
	try {
		if (!name || !difficulty || !season)
			return res.status(409).send("Please provide all Activity's data");
		await Activity.create(newActivity);
		return res
			.status(200)
			.json(`Activity: ${newActivity.name} succesfully inserted in database`);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = postActivity;
