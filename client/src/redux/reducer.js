/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import {
	GET_COUNTRIES,
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
	},
	order: {
		by: null,
		type: null,
	},
};

const rootReducer = (state = initialState, action) => {
	let orderedCountries;
	let filterByActivity;
	let lastFilteredCountries;
	let response;
	switch (action.type) {
		case GET_COUNTRIES:
			console.log('ejecución de get all countries');
			return {
				...state,
				allCountries: [...action.payload],
				filteredCountries: [...action.payload],
			};

		/* 		case GET_COUNTRY_BY_NAME:
			console.log('ejecución de get country by name', action.payload);

			return {
				...state,
				filteredCountries: [...action.payload],
			}; */

		case GET_ALL_ACTIVITY_NAMES:
			console.log('ejecución de get all activities');

			return {
				...state,
				allActivities: [...action.payload],
			};

		case ORDER_BY_NAME:
			response = {
				...state,
				order: {
					by: 'name',
					type: action.payload === 'Population Ascending' ? 'asc' : 'desc',
				},
			};
			response.filteredCountries = applyFilters(
				response.allCountries,
				response.appliedFilters,
				response.order
			);
			return response;

		case ORDER_BY_POPULATION:
			response = {
				...state,
				order: {
					by: 'population',
					type: action.payload === 'Population Ascending' ? 'asc' : 'desc',
				},
			};
			response.filteredCountries = applyFilters(
				response.allCountries,
				response.appliedFilters,
				response.order
			);
			return response;

		case FILTER_BY_ACTIVITY:
			response = {
				...state,
				appliedFilters: {
					...state.appliedFilters,
					activity: action.payload === 'reset' ? null : action.payload,
				},
			};
			response.filteredCountries = applyFilters(
				response.allCountries,
				response.appliedFilters,
				response.order
			);
			return response;

		case FILTER_BY_CONTINENT:
			response = {
				...state,
				appliedFilters: {
					...state.appliedFilters,
					continent: action.payload === 'reset' ? null : action.payload,
				},
			};
			response.filteredCountries = applyFilters(
				response.allCountries,
				response.appliedFilters,
				response.order
			);
			return response;

		case RESET:
			console.log('Ejecución OK del reset');
			response = {
				...state,
				appliedFilters: { continent: null, activity: null },
				order: { by: null, type: null },
			};
			response.filteredCountries = applyFilters(
				response.allCountries,
				response.appliedFilters,
				response.order
			);
			return response;

		default:
			return {
				...state,
			};
	}
};

function applyFilters(countries, filters, order) {
	let countriesCopy = [...countries];
	if (filters.continent) {
		countriesCopy = countriesCopy.filter(
			(country) => country.continent === filters.continent
		);
	}
	if (filters.activity) {
		countriesCopy = countriesCopy.filter((country) =>
			country.Activities.some((activity) => activity.name === filters.activity)
		);
	}
	if (order.by) {
		const orderType = order.type === 'asc' ? 1 : -1;
		countriesCopy = countriesCopy.sort((a, b) =>
			a[order.by] < b[order.by] ? orderType : orderType * -1
		);
	}
	return countriesCopy;
}

export default rootReducer;
