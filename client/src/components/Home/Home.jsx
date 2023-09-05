import React, { useEffect } from 'react';
import CardsContainer from '../CardsContainer/CardsContainer';
import Filters from '../Filters/Filters';
import style from './Home.module.css';
import {
	getCountries,
	getActivityNames,
	getCountriesByName,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function Home() {
	const dispatch = useDispatch();
	const location = useLocation();

	const allCountries = useSelector((state) => state.allCountries);
	const filteredCountries = useSelector((state) => state.filteredCountries);
	const searchQuery = useSelector((state) => state.searchQuery);
	const refresh = useSelector((state) => state.refresh);

	useEffect(() => {
		if (location.search.length === 0) dispatch(getCountries());
		if (location.search === `?name:${searchQuery}`)
			dispatch(getCountriesByName(searchQuery));
		dispatch(getActivityNames());
	}, [searchQuery]);

	console.log('countries count at Home: ', filteredCountries.length);

	return (
		<div className={style.container}>
			<Filters />
			<CardsContainer />
		</div>
	);
}
