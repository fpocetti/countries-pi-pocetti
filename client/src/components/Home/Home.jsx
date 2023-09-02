import React, { useEffect } from 'react';
import CardsContainer from '../CardsContainer/CardsContainer';
import Filters from '../Filters/Filters';
import style from './Home.module.css';
import { getCountries, getActivityNames } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function Home() {
	const dispatch = useDispatch();
	const location = useLocation();

	const allCountries = useSelector((state) => state.allCountries);
	const refresh = useSelector((state) => state.refresh);

	console.log(location);

	useEffect(() => {
		dispatch(getCountries());
		dispatch(getActivityNames());
	}, []);

	console.log('countries count at Home: ', allCountries.length);

	return (
		<div className={style.container}>
			<Filters />
			<CardsContainer />
		</div>
	);
}
