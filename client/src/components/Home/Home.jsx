import React, { useEffect } from 'react';
import CardsContainer from '../CardsContainer/CardsContainer';
import Filters from '../Filters/Filters';
import style from './Home.module.css';
import { getAllCountries, getActivityNames } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.allCountries);

	//!crear estados para traerme los continentes y los tipos de actividad turística. Luego, hacer un map para crear el listado de selects.

	//!ver cómo es la forma más estética de crear filtros

	useEffect(() => {
		dispatch(getAllCountries());
		dispatch(getActivityNames());
	}, []);

	console.log(allCountries);

	const refresh = useSelector((state) => state.refresh);

	return (
		<div className={style.container}>
			<Filters />
			<CardsContainer />
		</div>
	);
}
