const axios = require('axios');

const fetchAllData = async () => {
	try {
		//bring all countries from local API
		const response = await axios.get('http://localhost:5000/countries');

		//convert all found countries into the structure of Country model before inserting in the database
		const countries = response.data.map((country) => ({
			id: country.cca3.toLowerCase(),
			name: country.name.common,
			flag: country.flags.png ? country.flags.png : 'undefined',
			continent: country.continents[0]
				? country.continents[0]
				: 'undefined Continent',
			capital: country.capital ? country.capital : ['undefined Capital'],
			subregion: country.subregion,
			area: country.area,
			population: country.population,
		}));
		return countries;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = fetchAllData;
