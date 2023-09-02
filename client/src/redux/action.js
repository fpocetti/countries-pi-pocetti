import axios from 'axios';
import { URL_COUNTRIES, URL_ACTIVITIES } from '../utils/serverEndpoints';

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

export const getCountries = (name) => {
	return async function (dispatch) {
		try {
			let response;
			if (name) {
				response = await axios.get(`${URL_COUNTRIES}?name=${name}`);
			} else {
				response = await axios.get(URL_COUNTRIES);
			}
			return dispatch({
				type: GET_COUNTRIES,
				payload: response.data,
			});
		} catch (error) {
			console.error(error);
		}
	};
};

/* export const getCountriesByName = (name) => {
	console.log('request al server ', name);

	return async function (dispatch) {
		try {
			let response = await axios.get(`${URL_COUNTRIES}?name=${name}`);
			return dispatch({
				type: GET_COUNTRY_BY_NAME,
				payload: response.data,
			});
		} catch (error) {
			console.error(error);
		}
	};
}; */

export const getActivityNames = () => {
	return async function (dispatch) {
		try {
			let response = await axios.get(URL_ACTIVITIES);
			return dispatch({
				type: GET_ALL_ACTIVITY_NAMES,
				payload: response.data,
			});
		} catch (error) {
			console.error(error);
		}
	};
};

export function orderByName(order) {
	return {
		type: ORDER_BY_NAME,
		payload: order,
	};
}
export function orderByPopulation(order) {
	return {
		type: ORDER_BY_POPULATION,
		payload: order,
	};
}
export function filterByActivity(activity) {
	return {
		type: FILTER_BY_ACTIVITY,
		payload: activity,
	};
}
export function filterByContinent(continent) {
	return {
		type: FILTER_BY_CONTINENT,
		payload: continent,
	};
}

export function refresh() {
	return {
		type: REFRESH,
	};
}

export function resetCountries() {
	return {
		type: RESET,
	};
}
