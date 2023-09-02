/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import style from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCountries } from '../../redux/action';

export default function SearchBar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [nameQuery, setNameQuery] = useState('');

	const handleSearch = (nameQuery) => {
		let normalizedName = nameQuery.toLowerCase();
		console.log('On search ', normalizedName);
		navigate(`/countries?name=${normalizedName}`);
		//hacer validaciones del tipo de input
		dispatch(getCountries(normalizedName));
	};

	const handleChange = (event) => {
		setNameQuery(event.target.value);
		console.log('handleChange ', nameQuery);
	};

	return (
		<div className={style.searchBar}>
			<input
				type="search"
				value={nameQuery}
				onChange={handleChange}
				placeholder="Search countries by name..."
				className={style.input}
			/>
			<button className={style.button} onClick={() => handleSearch(nameQuery)}>
				Search
			</button>
		</div>
	);
}
