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
	NEXT_PAGE,
	PREV_PAGE,
} from './action-types';

const initialState = {
	allCountries: [],
	filteredCountries: [],
	allActivities: [],
	refresh: false,
	pagination: {
		page: 1,
		pageSize: 10,
		countriesCount: 0,
		totalPageCount: 0,
	},
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
	let response;
	let totalCountries;
	let totalPages;

	switch (action.type) {
		case GET_COUNTRIES:
			console.log('ejecución de get_countries');
			totalCountries = [...action.payload];

			return {
				...state,
				pagination: {
					...state.pagination,
					countriesCount: totalCountries.length,
					totalPageCount: Math.ceil(
						totalCountries.length / state.pagination.pageSize
					),
				},
				allCountries: totalCountries,
				filteredCountries: totalCountries,
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
				pagination: {
					...state.pagination,
					page: 1,
				},
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
				pagination: {
					...state.pagination,
					page: 1,
				},
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
				pagination: {
					...state.pagination,
					page: 1,
				},
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
			response.pagination.countriesCount = response.filteredCountries.length;

			response.pagination.totalPageCount = Math.ceil(
				response.pagination.countriesCount / state.pagination.pageSize
			);
			return response;

		case FILTER_BY_CONTINENT:
			response = {
				...state,
				appliedFilters: {
					...state.appliedFilters,
					continent: action.payload === 'reset' ? null : action.payload,
				},
				pagination: {
					...state.pagination,
					page: 1,
				},
			};
			response.filteredCountries = applyFilters(
				response.allCountries,
				response.appliedFilters,
				response.order
			);
			response.pagination.countriesCount = response.filteredCountries.length;

			response.pagination.totalPageCount = Math.ceil(
				response.pagination.countriesCount / state.pagination.pageSize
			);
			return response;

		case RESET:
			console.log('Ejecución OK del reset');
			response = {
				...state,
				appliedFilters: {
					continent: null,
					activity: null,
				},
				order: {
					by: null,
					type: null,
				},
				pagination: {
					...state.pagination,
					page: 1,
				},
			};
			response.filteredCountries = applyFilters(
				response.allCountries,
				response.appliedFilters,
				response.order
			);
			response.pagination.countriesCount = response.filteredCountries.length;

			response.pagination.totalPageCount = Math.ceil(
				response.pagination.countriesCount / state.pagination.pageSize
			);
			return response;

		case NEXT_PAGE:
			response = {
				...state,
				pagination: {
					...state.pagination,
					page: action.payload,
				},
			};
			return response;

		case PREV_PAGE:
			response = {
				...state,
				pagination: {
					...state.pagination,
					page: action.payload,
				},
			};
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
