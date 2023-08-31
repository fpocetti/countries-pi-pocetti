import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

export default function NavBar() {
	return (
		<div className={style.navContainer}>
			<Link to="/countries" className={style.link}>
				Explore all countries
			</Link>
			<Link to="/activity/create" className={style.link}>
				Create activity
			</Link>
			<SearchBar />
		</div>
	);
}
