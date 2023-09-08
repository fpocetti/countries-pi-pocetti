/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import style from './SearchBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCountries, getCountriesByName } from '../../redux/action';

export default function SearchBar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [searchQuery, setSearchQuery] = useState('');

	const handleChange = (event) => {
		//despachar una acción
		setSearchQuery(event.target.value);
		return searchQuery;
	};

	const handleSearch = async (searchQuery) => {
		if (location.pathname !== '/countries') {
			navigate('/countries');
			if (searchQuery.length !== 0) {
				try {
					const response = await dispatch(getCountriesByName(searchQuery));
					navigate(`/countries?name=${searchQuery}`);
					console.log(response);
				} catch (error) {
					console.error(error);
				}
			}
		} else if (
			location.pathname === '/countries' &&
			location.search.length === 0
		) {
			if (searchQuery.length !== 0) {
				dispatch(getCountriesByName(searchQuery));
				navigate(`/countries?name=${searchQuery}`);
			} else {
				dispatch(getCountries());
				navigate('/countries');
			}
		} else {
			if (searchQuery.length !== 0) {
				dispatch(getCountriesByName(searchQuery));
				navigate(`/countries?name=${searchQuery}`);
			} else {
				dispatch(getCountries());
				navigate('/countries');
			}
		}
		setSearchQuery('');
	};

	return (
		<div className={style.searchBar}>
			<input
				type="search"
				value={searchQuery}
				onChange={handleChange}
				placeholder="Search countries by name..."
				className={style.input}
			/>
			<button
				className={style.button}
				onClick={() => handleSearch(searchQuery)}
			>
				Search
			</button>
		</div>
	);
}
