/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ flag, continent, name, id }) {
	const nameToUpperCase = name.toUpperCase();
	return (
		<div className={style.card}>
			<Link to={`/countries/${id}`}>
				<h2 className={style.cardTitle}>{nameToUpperCase}</h2>
				<img src={flag} alt={name} className={style.cardImage} />
				<h3 className={style.cardText}>{continent}</h3>
			</Link>
		</div>
	);
}
