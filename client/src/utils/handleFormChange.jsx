import createActivityValidations from './createActivityValidations';

const handleChange = (
	event,
	activity,
	setActivity,
	setErrors,
	activityNames
) => {
	let updates = {
		activityUpdates: {},
		errorUpdates: {},
	};

	if (event.target.name === 'countries') {
		updates.activityUpdates = {
			...activity,
			countries: event.target.checked
				? [...activity.countries, event.target.value]
				: activity.countries.filter((country) => country != event.target.value),
		};
	} else if (event.target.name === 'difficulty') {
		updates.activityUpdates = {
			...activity,
			difficulty: parseInt(event.target.value),
		};
	} else if (event.target.name === 'duration') {
		updates.activityUpdates = {
			...activity,
			duration: parseFloat(event.target.value),
		};
	} else if (event.target.name === 'name') {
		updates.activityUpdates = {
			...activity,
			name: event.target.value.toUpperCase(),
		};
	} else if (event.target.name === 'seasons') {
		updates.activityUpdates = {
			...activity,
			seasons: event.target.checked
				? [...activity.seasons, event.target.value]
				: activity.seasons.filter((season) => season != event.target.value),
		};
	}

	setActivity({
		...activity,
		...updates.activityUpdates,
	});

	updates.errorUpdates = createActivityValidations(
		{
			...activity,
			[event.target.name]: event.target.value,
		},
		activityNames
	);

	setErrors(updates.errorUpdates);

	if (
		event.target.name === 'seasons' &&
		updates.activityUpdates.seasons.length === 0
	) {
		setErrors((errors) => ({
			...errors,
			seasons: 'Please include at least one season',
		}));
	}

	if (
		event.target.name === 'countries' &&
		updates.activityUpdates.countries.length === 0
	) {
		setErrors((errors) => ({
			...errors,
			countries: 'Please include at least one country',
		}));
	}
	return updates;
};

export default handleChange;
