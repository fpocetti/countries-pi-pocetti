import React, { useEffect, useState } from 'react';
import CardsContainer from '../CardsContainer/CardsContainer';
import axios from 'axios';
import { URL_COUNTRIES } from '../../utils/serverEndpoints';

export default function Home() {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios
			.get(URL_COUNTRIES)
			.then((response) => {
				setCountries(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
			<h1>Welcome to your home</h1>
			<CardsContainer countries={countries} />
		</div>
	);
}
