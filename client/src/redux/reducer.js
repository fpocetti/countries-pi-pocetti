import {
	GET_ALL_COUNTRIES,
	GET_ALL_ACTIVITY_NAMES,
	ORDER_BY_NAME,
	ORDER_BY_POPULATION,
	FILTER_BY_ACTIVITY,
	FILTER_BY_CONTINENT,
	REFRESH,
	RESET,
} from './action-types';

const initialState = {
	allCountries: [],
	filteredCountries: [],
	allActivities: [],
	refresh: false,
	appliedFilters: {
		activity: null,
		continent: null,
		population: null,
		name: null,
	},
};

const rootReducer = (state = initialState, action) => {
	let orderedCountries;
	let filterByActivity;
	let lastFilteredCountries;
	switch (action.type) {
		case GET_ALL_COUNTRIES:
			console.log('ejecución de get all countries');
			return {
				...state,
				allCountries: [...action.payload],
				filteredCountries: [...action.payload],
			};

		case GET_ALL_ACTIVITY_NAMES:
			console.log('ejecución de get all activities');

			return {
				...state,
				allActivities: [...action.payload],
			};

		case ORDER_BY_NAME:
			if (action.payload === 'Name Ascending') {
				orderedCountries = state.filteredCountries.sort((a, b) =>
					a.name > b.name ? 1 : -1
				);
			} else {
				orderedCountries = state.filteredCountries.sort((a, b) =>
					b.name > a.name ? 1 : -1
				);
			}
			lastFilteredCountries = [...state.filteredCountries];
			console.log('Ejecución de order by name. Orden: ', action.payload);
			return {
				...state,
				refresh: !state.refresh,
				filteredCountries: lastFilteredCountries,
				appliedFilters: {
					...state.appliedFilters,
					name: action.payload,
					population: null,
				},
			};

		case ORDER_BY_POPULATION:
			if (action.payload === 'Population Ascending') {
				orderedCountries = state.filteredCountries.sort((a, b) =>
					a.population > b.population ? 1 : -1
				);
			} else {
				orderedCountries = state.filteredCountries.sort((a, b) =>
					b.population > a.population ? 1 : -1
				);
			}
			lastFilteredCountries = [...state.filteredCountries];
			console.log('Ejecución de order by population. Orden:', action.payload);

			return {
				...state,
				refresh: !state.refresh,
				filteredCountries: lastFilteredCountries,
				appliedFilters: {
					...state.appliedFilters,
					population: action.payload,
					name: null,
				},
			};

		case FILTER_BY_ACTIVITY:
			if (action.payload === 'reset') {
				lastFilteredCountries = [...state.allCountries];
				return {
					...state,
					refresh: !state.refresh,
					filteredCountries: lastFilteredCountries,
					appliedFilters: {
						...state.appliedFilters,
						activity: null,
					},
				};
			} else {
				filterByActivity = state.allCountries.filter((country) =>
					country.Activities.some(
						(activity) => activity.name === action.payload
					)
				);
				lastFilteredCountries = filterByActivity;
				console.log('Ejecución de filtro por actividad ', action.payload);
				return {
					...state,
					refresh: !state.refresh,
					filteredCountries: lastFilteredCountries,
					appliedFilters: {
						...state.appliedFilters,
						activity: action.payload,
					},
				};
			}

		case FILTER_BY_CONTINENT:
			if (action.payload === 'reset') {
				lastFilteredCountries = [...state.allCountries];
				return {
					...state,
					refresh: !state.refresh,
					filteredCountries: lastFilteredCountries,
					appliedFilters: {
						...state.appliedFilters,
						continent: null,
					},
				};
			} else {
				lastFilteredCountries = state.allCountries.filter(
					(country) => country.continent === action.payload
				);
				console.log('ejecución de filtro por continente: ', action.payload);
				return {
					...state,
					refresh: !state.refresh,
					filteredCountries: lastFilteredCountries,
					appliedFilters: {
						...state.appliedFilters,
						continent: action.payload,
					},
				};
			}
		case RESET:
			console.log('Ejecución OK del reset');
			return {
				...state,
				filteredCountries: [...state.allCountries],
			};
		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
