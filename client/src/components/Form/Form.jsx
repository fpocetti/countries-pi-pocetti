/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Form.module.css';

export default function Form() {
	const allActivities = useSelector((state) => state.allActivities);
	const allCountries = useSelector((state) => state.allCountries);

	let countryNames = [];
	allCountries.map((country) => {
		if (!countryNames.includes(country.name)) {
			countryNames.push(country.name);
		}
		return countryNames;
	});

	console.log('country names at the form ', countryNames.length);
	//me traigo el array con activity names para la validación
	const activityNames = allActivities.map((activity) => activity.name);

	const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
	const difficultyLevels = [1, 2, 3, 4, 5];
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [errors, setErrors] = useState({});

	const [activity, setActivity] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
	});

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		setActivity({ ...activity, [event.target.name]: event.target.value });
	};
	console.log(activity);

	const handleSelectCountryChange = (event) => {
		// const selected =
	};

	return (
		<div className={style.formContainer}>
			<form onSubmit={handleSubmit} className={style.form}>
				<h2 className={style.title}>
					Fill in this form to create a new Activity
				</h2>
				<div>
					<label htmlFor="name">Activity name</label>
					<input
						type="text"
						name="name"
						value={activity.name}
						onChange={handleChange}
						className={style.input}
						placeholder="Activity name"
					/>
					{errors.name && <p>{errors.name}</p>}
				</div>

				<div>
					<label htmlFor="difficulty">Difficulty</label>
					<select
						type="text"
						name="difficulty"
						value={activity.difficulty}
						onChange={handleChange}
						className={style.input}
						placeholder="Difficulty 1 easiest... 5 hardest"
					>
						<option value="" key="season">
							Select difficulty
						</option>
						{difficultyLevels.map((difficulty, index) => (
							<option value={activity.difficulty} key={index}>
								{difficulty}
							</option>
						))}
					</select>
					{errors.difficulty && <p>{errors.difficulty}</p>}
				</div>

				<div>
					<label htmlFor="duration">Duration (hs)</label>
					<input
						type="number"
						name="duration"
						value={activity.duration}
						onChange={handleChange}
						className={style.input}
					/>
					{errors.duration && <p>{errors.duration}</p>}
				</div>

				<div>
					<label htmlFor="season">Season</label>
					<select
						type="text"
						name="season"
						value={activity.season}
						onChange={handleChange}
						className={style.select}
					>
						<option value="" key="season">
							Select season
						</option>
						{seasons.sort().map((season, index) => (
							<option value={activity.season} key={index}>
								{season}
							</option>
						))}
					</select>
					{errors.season && <p>{errors.season}</p>}
				</div>

				<div>
					<label htmlFor="countries">Country</label>
					<select
						multiple
						name="countries"
						value={selectedCountries}
						onChange={handleChange}
						className={style.input}
					>
						<option value="" key="countries">
							Select one or more countries
						</option>

						{/* research how to connect to country's ID */}
						{countryNames.sort().map((country, index) => (
							<option value={country} key={index}>
								{country}
							</option>
						))}
					</select>
					{errors.countries && <p>{errors.countries}</p>}
				</div>

				<button type="submit">Create activity</button>
			</form>
		</div>
	);
}
