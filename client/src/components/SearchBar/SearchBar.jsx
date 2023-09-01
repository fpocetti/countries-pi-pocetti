import React from 'react';
import style from './SearchBar.module.css';

export default function SearchBar() {
	return (
		<div className={style.searchBar}>
			<input
				type="text"
				placeholder="Search countries by name..."
				className={style.input}
			/>
			<button className={style.button}>Search</button>
		</div>
	);
}
