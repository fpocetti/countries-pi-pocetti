const { Activity, Country } = require('../db');

const postActivity = async (req, res) => {
	//creates a new entry in Activity model
	const { name, difficulty, duration, season, countries } = req.body;
	const newActivity = {
		name,
		difficulty,
		duration,
		season,
	};
	try {
		if (!name || !difficulty || !season || !countries || countries.length === 0)
			return res
				.status(409)
				.send(
					"Please provide all Activity's data and at least one associated country"
				);
		const createdActivity = await Activity.create(newActivity);

		//creates associations with country or countries
		const associatedCountries = await Country.findAll({
			where: { id: countries },
		});

		await createdActivity.setCountries(associatedCountries);

		return res
			.status(200)
			.json(
				`Activity: ${newActivity.name} succesfully inserted in database and related to countries`
			);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = postActivity;
