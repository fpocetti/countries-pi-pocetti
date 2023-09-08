const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const getCountries = async (req, res) => {
	const { name } = req.query;

	try {
		//if no queries on URL, gets all countries
		if (!name) {
			const response = await Country.findAll({
				include: [{ model: Activity, through: { attributes: [] } }],
			});
			return res.status(200).json(response);
		}
		//if a query is present on URL, searchs for matching countries
		const response = await Country.findAll({
			where: {
				name: { [Op.iLike]: `%${name}%` },
			},
			include: [{ model: Activity, through: { attributes: [] } }],
		});
		if (response.length === 0)
			return res.status(404).send('404 Country not found');
		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = getCountries;
