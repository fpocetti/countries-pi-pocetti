import createActivityValidations from './createActivityValidations';

const handleChange = (
	event,
	activity,
	setActivity,
	setErrors,
	activityNames
) => {
	let activityUpdates = {};

	if (event.target.name === 'countries') {
		activityUpdates = {
			...activity,
			countries: event.target.checked
				? [...activity.countries, event.target.value]
				: activity.countries.filter((country) => country != event.target.value),
		};
	} else if (event.target.name === 'difficulty') {
		activityUpdates = {
			...activity,
			difficulty: parseInt(event.target.value),
		};
	} else if (event.target.name === 'duration') {
		activityUpdates = {
			...activity,
			duration: parseFloat(event.target.value),
		};
	} else if (event.target.name === 'name') {
		activityUpdates = {
			...activity,
			name: event.target.value.toUpperCase(),
		};
	} else if (event.target.name === 'seasons') {
		activityUpdates = {
			...activityUpdates,
			seasons: event.target.checked
				? [...activity.seasons, event.target.value]
				: activity.seasons.filter((season) => season != event.target.value),
		};
	}

	setActivity({
		...activity,
		...activityUpdates,
	});

	const updatedErrors = createActivityValidations(
		{
			...activity,
			[event.target.name]: event.target.value,
		},
		activityNames
	);

	setErrors(updatedErrors);

	if (event.target.name === 'seasons' && activityUpdates.seasons.length === 0) {
		setErrors((errors) => ({
			...errors,
			seasons: 'Please include at least one season',
		}));
	}

	if (
		event.target.name === 'countries' &&
		activityUpdates.countries.length === 0
	) {
		setErrors((errors) => ({
			...errors,
			countries: 'Please include at least one country',
		}));
	}
};

export default handleChange;
