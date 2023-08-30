const { Activity } = require('../db');

const getActivities = async (req, res) => {
	//gets all entries in Activity model

	try {
		const response = await Activity.findAll();
		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = getActivities;
