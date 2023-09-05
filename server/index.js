const getServer = require('./src/server');
const populateDataBase = require('./src/utils/populateDataBase');
const { conn } = require('./src/db.js');
const PORT = 3001;

//initializing Server (getServer()), communication with DB (conn.sync) and populating database (if empty)
//!change {force: false} before sending PI for correction!!

conn
	.sync({ force: true })
	.then(() => {
		getServer().listen(PORT, async () => {
			console.log(`Server listening on port ${PORT}`);
			await populateDataBase();
		});
	})
	.catch((error) => console.error(error));
