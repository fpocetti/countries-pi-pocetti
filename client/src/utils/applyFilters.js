export default function applyFilters(countries, filters, order) {
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

//improve order by name with .sort((a, b) => a.name.localeCompare(b.name))
