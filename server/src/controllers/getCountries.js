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

	/*       
      res.send(
			'This is route GET /countries. This will return an array of objects. Each object contains a country with its info.'
		);
	} else {
		const getCountriesByName = await res.send(
			`This is route GET /countries?name="...". This will return an array of objects whose property name matches the string received by query: ${name}, or return an error message`
		);
	} */
};

module.exports = getCountries;
