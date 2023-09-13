// const server = require('../src/server.js');
// const { conn, Country } = require('../src/db.js');

// let serverInstance;

// beforeEach(async () => {
// 	await conn.sync();
// 	serverInstance = server();
// });

// afterAll(async () => {
// 	await conn.close();
// });

// it('Creates a new Country entry', async () => {
// 	const newCountry = await Country.create({
// 		name: 'Venezuela',
// 		capital: ['Caracas'],
// 		id: 'ven',
// 		continent: 'South America',
// 		area: '916445',
// 		flag: 'https://flagcdn.com/w320/ve.png',
// 		population: 28435943,
// 		subregion: 'South America',
// 	});

// 	expect(newCountry.id).toBe('ven');
// });
