/* eslint-disable react/prop-types */
import React from 'react';
import Card from '../Card/Card';
// eslint-disable-next-line no-unused-vars
import style from './CardsContainer.module.css';

export default function CardsContainer({ countries }) {
	console.log('this is happening in Cards: ', countries);
	return (
		<div>
			{countries.map((country, index) => {
				return (
					<Card
						key={index}
						id={country.id}
						flag={country.flag}
						continent={country.continent}
						name={country.name}
					/>
				);
			})}
		</div>
	);
}
