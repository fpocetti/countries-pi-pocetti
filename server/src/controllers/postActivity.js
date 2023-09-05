const { Activity, Country } = require('../db');
const activityPostValidation = require('../utils/activityPostValidation');

const postActivity = async (req, res) => {
	//creates a new entry in Activity model
	const { name, difficulty, duration, seasons, countries } = req.body;

	validatedActivity = activityPostValidation(
		name,
		difficulty,
		duration,
		seasons
	);

	try {
		if (
			!name ||
			!difficulty ||
			!seasons ||
			!countries ||
			countries.length === 0 ||
			seasons.length === 0
		)
			return res
				.status(409)
				.send(
					"Please provide all Activity's data and at least one associated country"
				);
		const createdActivity = await Activity.create(validatedActivity);

		//creates associations with country or countries
		const associatedCountries = await Country.findAll({
			where: { id: countries },
		});

		await createdActivity.setCountries(associatedCountries);

		return res
			.status(200)
			.json(
				`Activity: ${validatedActivity.name} succesfully inserted in database and related to countries`
			);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = postActivity;
