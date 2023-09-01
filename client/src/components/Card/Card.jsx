/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ flag, continent, name, id }) {
	console.log('Country id: ', id);
	return (
		<div>
			<Link to={`/countries/${id}`}>
				<h2>{name}</h2>
				<img src={flag} alt={name} />
				<h3>{continent}</h3>
			</Link>
		</div>
	);
}
