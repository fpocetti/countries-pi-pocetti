const { Country } = require('../db');
const { Op } = require('sequelize');

const getCountries = async (req, res) => {
	const { name } = req.query;
	try {
		if (!name) {
			const response = await Country.findAll();
			return res.status(200).json(response);
		}
		const response = await Country.findAll({
			where: {
				name: { [Op.iLike]: `%${name}%` },
			},
		});
		if (response.length === 0)
			return res
				.status(404)
				.send(
					'Country not found. Please provide a valid name or search for all Countries instead'
				);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = getCountries;
