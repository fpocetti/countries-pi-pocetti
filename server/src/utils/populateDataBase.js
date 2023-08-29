const fetchAllData = require('./fetchAllData');
const { Country } = require('../db');

//insert data in the Country model only if it is empty

const populateDataBase = async () => {
	try {
		//are there entries in the Country model?
		const countryCount = await Country.count();

		//if none, create them.
		if (countryCount === 0) {
			const countriesData = await fetchAllData();
			const createdCountries = await Country.bulkCreate(countriesData);
			console.log(
				`Database succesfully populated with ${createdCountries.length} countries`
			);

			//if existing, use the previously loaded data.
		} else {
			console.log(
				`${countryCount} countries are already loaded in your database`
			);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = populateDataBase;
