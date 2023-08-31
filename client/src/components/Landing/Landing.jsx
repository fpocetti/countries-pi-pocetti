import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

export default function Landing() {
	return (
		<div>
			<h1>Hello, world!</h1>
			<button title="Navigate to all countries" onClick={() => alert('Hi')}>
				Explore all countries
			</button>
			<SearchBar />
		</div>
	);
}
