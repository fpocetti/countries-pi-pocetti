const getCountryById = (req, res) => {
	res.send(
		'This is route GET/countries/:id. Receives a country ID per params and the matching country will be shown + the activities related to the country'
	);
};

module.exports = getCountryById;
