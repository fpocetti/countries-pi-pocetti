const getServer = require('./src/server');
const populateDataBase = require('./src/utils/populateDataBase');
const { conn } = require('./src/db.js');
const PORT = 3001;

conn
	.sync({ force: true })
	.then(() => {
		getServer().listen(PORT, async () => {
			console.log(`Server listening on port ${PORT}`);
			await populateDataBase();
		});
	})
	.catch((error) => console.error(error));
