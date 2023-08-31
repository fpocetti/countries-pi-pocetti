const { Country, Activity } = require('../db');

const getCountryById = async (req, res) => {
	//returns the country matching the id received by params (previously normalized)

	const { id } = req.params;
	const normalizedId = id.toLowerCase();
	try {
		const response = await Country.findByPk(normalizedId, {
			include: [{ model: Activity, through: { attributes: [] } }],
		});
		if (response === null) return res.status(404).json(`Invalid id: ${id}`);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = getCountryById;
