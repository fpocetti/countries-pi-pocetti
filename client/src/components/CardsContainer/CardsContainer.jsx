/* eslint-disable react/prop-types */
import React from 'react';
import Card from '../Card/Card';
// eslint-disable-next-line no-unused-vars
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

export default function CardsContainer() {
	const filteredCountries = useSelector((state) => state.filteredCountries);

	return (
		<div className={style.cardsContainer}>
			{filteredCountries?.map((country, index) => {
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
