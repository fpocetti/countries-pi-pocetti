const request = require('supertest');
const server = require('../src/server.js');
const { conn, Country } = require('../src/db.js');

//creating an array of countries for a testing dataBase
let serverInstance;
const mockCountries = [
	{
		name: 'Comoros',
		capital: ['Moroni'],
		id: 'com',
		continent: 'Africa',
		area: '1862',
		flag: 'https://flagcdn.com/w320/km.png',
		population: 869595,
		subregion: 'Eastern Africa',
		Activities: [
			{
				difficulty: 2,
				duration: '2',
				id: '5100f680-22d7-4c22-81ee-6cec9c54c01a',
				name: 'HIKING',
				seasons: ['Autumn'],
			},
		],
	},
	{
		name: 'Australia',
		capital: ['Canberra'],
		id: 'aus',
		continent: 'Oceania',
		area: '7692024',
		flag: 'https://flagcdn.com/w320/au.png',
		population: 25687041,
		subregion: 'Australia and New Zealand',
		Activities: [],
	},
	{
		name: 'Norway',
		capital: ['Oslo'],
		id: 'nor',
		continent: 'Europe',
		area: '323802',
		flag: 'https://flagcdn.com/w320/no.png',
		population: 5379475,
		subregion: 'Northern Europe',
		Activities: [],
	},
	{
		name: 'Venezuela',
		capital: ['Caracas'],
		id: 'ven',
		continent: 'South America',
		area: '916445',
		flag: 'https://flagcdn.com/w320/ve.png',
		population: 28435943,
		subregion: 'South America',
		Activities: [
			{
				id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
				name: 'SAMBA DANCING',
				difficulty: 1,
				duration: '2',
				seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
			},
		],
	},
	{
		name: 'Brazil',
		capital: ['Brasília'],
		id: 'bra',
		continent: 'South America',
		area: '8515767',
		flag: 'https://flagcdn.com/w320/br.png',
		population: 212559409,
		subregion: 'South America',
		Activities: [
			{
				id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
				name: 'SAMBA DANCING',
				difficulty: 1,
				duration: '2',
				seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
			},
		],
	},
];

//populating dataBase with mockCountries
beforeEach(async () => {
	await conn
		.sync({ force: true })
		.then(() => {
			serverInstance = server();
		})
		.then(async () => {
			await Country.bulkCreate(mockCountries);
			await Country.findAll();
		});
});

describe('GET /activities', () => {
	it('should return status 200', async () => {
		const response = await request(serverInstance).get('/activities').send();
		expect(response.status).toBe(200);
	});
});

describe('POST /activities', () => {
	it('when receiving an Activity with missing information, should return status 409', async () => {
		const invalidActivity = {
			name: 'PHOTOGRAPHY',
			difficulty: 3,
			duration: 2.5,
			seasons: ['Summer'],
			countries: [],
		};
		const response = await request(serverInstance)
			.post('/activities')
			.send(invalidActivity);
		expect(response.status).toBe(409);

		// console.log(response);
		expect(response.text).toBe(
			"Please provide all Activity's data and at least one associated country"
		);
	});

	it('when receiving a valid Activity, should return status 200', async () => {
		const validActivity = {
			name: 'PHOTOGRAPHY',
			difficulty: 3,
			seasons: ['Summer'],
			countries: ['gib', 'zmb'],
		};
		const response = await request(serverInstance)
			.post('/activities')
			.send(validActivity);

		expect(response.status).toBe(200);
		expect(response.body).toBe(
			'Activity: PHOTOGRAPHY succesfully inserted in database and related to countries'
		);
	});
});

describe('GET /countries', () => {
	it('should return status 200 and countries array', async () => {
		const response = await request(serverInstance).get('/countries').send();
		expect(response.status).toBe(200);
	});
});
