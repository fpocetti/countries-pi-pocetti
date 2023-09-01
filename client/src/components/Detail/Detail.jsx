import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL_COUNTRIES } from '../../utils/serverEndpoints';
import axios from 'axios';

export default function Detail() {
	const { id } = useParams();
	const [country, setCountry] = useState({});

	useEffect(() => {
		axios
			.get(`${URL_COUNTRIES}/${id}`)
			.then((response) => response.data)
			.then((data) => {
				if (data.name) return setCountry(data);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div>
			<h1>{country?.name}</h1>
			<h3>Continent: {country?.continent}</h3>
			<h3>
				{country?.capital?.length === 1
					? `Capital: ${country.capital}`
					: `Capitals: ${country?.capital}`}
			</h3>
			<h3>Country ID (cca3): {country?.id}</h3>
			<h3>Subregion: {country?.subregion}</h3>
			<h3>{`Area: ${country?.area} m²`}</h3>
			<h3>Population: {country?.population}</h3>
			<h4>
				{`Touristic Activities: `}
				{country?.Activities?.length === 0 ? (
					<span>
						There are no entries for {country?.name}. To add an activity, please
						fill in this
						<a href="http://localhost:5173/activity/create"> form</a>.
					</span>
				) : (
					`${country?.Activities}`
				)}
			</h4>
			<img src={country?.flag} alt={`${country.name} flag`} />
		</div>
	);
}
