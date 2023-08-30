const { Activity } = require('../db');

const postActivity = async (req, res) => {
	//creates a new entry in Activity model
	const { activity } = req.body;
	console.log(activity);
	try {
		if (!activity.name || !activity.difficulty || !activity.season)
			return res.status(409).send("Please provide all Activity's data");
		const createdActivity = await Activity.create(activity);
		return res
			.status(200)
			.json(`Activity: ${activity.name} succesfully inserted in database`);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = postActivity;
