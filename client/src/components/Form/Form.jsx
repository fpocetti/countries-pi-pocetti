/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Form.module.css';
import { getCountries, postActivity } from '../../redux/action';
import createActivityValidations from '../../utils/createActivityValidations';

export default function Form() {
	const allActivities = useSelector((state) => state.allActivities);
	const allCountries = useSelector((state) => state.allCountries);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountries());
	}, []);

	//Reorganize countries by continent to improve form's UX
	let countriesByContinent = {};

	allCountries.forEach((country) => {
		if (!countriesByContinent[country.continent]) {
			countriesByContinent[country.continent] = [];
		}
		countriesByContinent[country.continent].push(country);
	});

	//me traigo el array con activity names para la validación
	const activityNames = allActivities.map((activity) => activity.name);

	const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
	const difficultyLevels = [1, 2, 3, 4, 5];

	const [activity, setActivity] = useState({
		name: '',
		difficulty: '',
		duration: '',
		seasons: [],
		countries: [],
	});

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		if (event.target.name === 'countries') {
			setActivity({
				...activity,
				countries: [...activity.countries, event.target.value],
			});
		} else if (event.target.name === 'difficulty') {
			setActivity({
				...activity,
				difficulty: parseInt(event.target.value),
			});
		} else if (event.target.name === 'duration') {
			setActivity({
				...activity,
				duration: parseFloat(event.target.value),
			});
		} else if (event.target.name === 'name') {
			setActivity({
				...activity,
				name: event.target.value.toUpperCase(),
			});
		} else {
			setActivity({
				...activity,
				seasons: [...activity.seasons, event.target.value],
			});
		}

		setErrors(
			createActivityValidations({
				...activity,
				[event.target.name]: event.target.value,
			})
		);
	};
	console.log(activity);
	console.log(errors);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(postActivity(activity));
	};

	return (
		<div className={style.formContainer}>
			<form onSubmit={handleSubmit} className={style.form}>
				<h2 className={style.title}>
					Fill in this form to create a new Activity
				</h2>
				<div className={style.formSection}>
					<div className={style.labelInput}>
						<label htmlFor="name" className={style.customLabel}>
							Activity name
						</label>
						<input
							type="text"
							name="name"
							value={activity.name}
							onChange={handleChange}
							className={style.input}
							placeholder="Activity name"
						/>
					</div>
					{errors.name && <p className={style.errorMessage}>{errors.name}</p>}
				</div>

				<div className={style.formSection}>
					<div className={style.labelInput}>
						<label htmlFor="duration" className={style.customLabel}>
							Duration (hs)
						</label>
						<input
							type="number"
							name="duration"
							value={activity.duration}
							onChange={handleChange}
							className={style.input}
						/>
					</div>
					{errors.duration && (
						<p className={style.errorMessage}>{errors.duration}</p>
					)}
				</div>

				<div className={style.formSection}>
					<div className={style.labelInput}>
						<label htmlFor="difficulty" className={style.customLabel}>
							Difficulty
						</label>
						<div className={style.difficultyContainer}>
							{difficultyLevels.map((difficulty, index) => (
								<div key={index}>
									<input
										type="radio"
										name="difficulty"
										value={difficulty}
										checked={activity.difficulty === difficulty}
										onChange={handleChange}
									></input>
									<label key={index} htmlFor="difficulty">
										{difficulty}
									</label>
								</div>
							))}
						</div>
					</div>
					{errors.difficulty && (
						<p className={style.errorMessage}>{errors.difficulty}</p>
					)}
				</div>

				<div className={style.formSection}>
					<div className={style.labelInput}>
						<label htmlFor="seasons" className={style.customLabel}>
							Season
						</label>
						<div className={style.seasonContainer}>
							{seasons.sort().map((season, index) => (
								<div key={index}>
									<input
										type="checkbox"
										name="seasons"
										value={season}
										checked={activity.seasons === season}
										key={index}
										onChange={handleChange}
									/>
									<label htmlFor={season}>{season}</label>
								</div>
							))}
						</div>
					</div>
					{errors.seasons && (
						<p className={style.errorMessage}>{errors.seasons}</p>
					)}
				</div>

				<div className={style.selectCountriesContainer}>
					<label className={style.customLabel}>Countries</label>
					<div>
						{errors.countries && (
							<p className={style.errorMessage}>{errors.countries}</p>
						)}
					</div>
				</div>
				<div className={style.continentContainer}>
					{Object.keys(countriesByContinent).map((continent) => (
						<div key={continent} className={style.continentTitle}>
							<h3>{continent}</h3>
							<div className={style.countriesContainer}>
								{countriesByContinent[continent]
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((country, index) => (
										<div key={index}>
											<input
												id={country.id}
												type="checkbox"
												name="countries"
												value={country.id}
												onChange={handleChange}
											/>
											<label htmlFor={country.name}>{country.name}</label>
										</div>
									))}
							</div>
						</div>
					))}
				</div>

				<button
					type="submit"
					className={style.formButton}
					disabled={
						activity.countries.length === 0 ||
						activity.difficulty.length === 0 ||
						activity.seasons.length === 0 ||
						errors.name ||
						errors.duration ||
						errors.seasons ||
						errors.difficulty ||
						errors.countries
					}
				>
					Create activity
				</button>
			</form>
		</div>
	);
}
