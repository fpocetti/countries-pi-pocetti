// eslint-disable-next-line no-unused-vars
import { React, useState } from 'react';
import style from './Filters.module.css';
import {
	filterByActivity,
	filterByContinent,
	orderByName,
	orderByPopulation,
	resetCountries,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Filters() {
	const filteredCountries = useSelector((state) => state.filteredCountries);
	const allCountries = useSelector((state) => state.allCountries);
	const allActivities = useSelector((state) => state.allActivities);
	const appliedFilters = useSelector((state) => state.appliedFilters);

	const [nameOrder, setNameOrder] = useState('');
	const [populationOrder, setPopulationOrder] = useState('');
	const [continentFilter, setContinentFilter] = useState('reset');
	const [activityFilter, setActivityFilter] = useState('reset');

	let continents = [];
	allCountries.map((country) => {
		if (!continents.includes(country.continent)) {
			continents.push(country.continent);
		}
		return continents;
	});
	const activityNames = allActivities.map((activity) => activity.name);

	const dispatch = useDispatch();

	const handleFilterByContinent = (event) => {
		dispatch(filterByContinent(event.target.value));
	};

	const handleFilterByActivity = (event) => {
		dispatch(filterByActivity(event.target.value));
	};

	const handleOrderByPopulation = (event) => {
		setPopulationOrder(event.target.value);
		setNameOrder('');
		dispatch(orderByPopulation(event.target.value));
	};

	const handleOrderByName = (event) => {
		setPopulationOrder('');
		setNameOrder(event.target.value);
		dispatch(orderByName(event.target.value));
	};

	const handleReset = (event) => {
		setPopulationOrder('');
		setNameOrder('');
		setContinentFilter('reset');
		setActivityFilter('reset');

		dispatch(resetCountries(event.target.value));
	};

	return (
		<div className={style.filterSection}>
			<div>
				<span className={style.filter}>
					∇ Filter countries by
					<select
						className={style.select}
						onChange={handleFilterByContinent}
						value={continentFilter}
					>
						<option value="reset">Continent</option>
						{continents.sort().map((continent, index) => (
							<option value={continent} key={index}>
								{continent}
							</option>
						))}
					</select>
					<select
						className={style.select}
						onChange={handleFilterByActivity}
						value={activityFilter}
					>
						<option value="reset">Activity</option>
						{activityNames.sort().map((activity, index) => (
							<option value={activity} key={index}>
								{activity}
							</option>
						))}
					</select>
				</span>
				<br />
				<span className={style.order}>
					↑↓ Order countries by
					<select
						className={style.select}
						onChange={handleOrderByPopulation}
						value={populationOrder}
					>
						<option value="">Population</option>
						<option value="Population Ascending">Ascending Population</option>
						<option value="Population Descending">Descending Population</option>
					</select>
					<select
						className={style.select}
						onChange={handleOrderByName}
						value={nameOrder}
					>
						<option value="">Name</option>

						<option value="Name Ascending">Ascending Name</option>
						<option value="Name Descending">Descending Name</option>
					</select>
				</span>
				<button className={style.button} onClick={handleReset}>
					Reset filters
				</button>
			</div>
		</div>
	);
}
