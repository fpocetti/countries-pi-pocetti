/* eslint-disable react/prop-types */
import React from 'react';
import Card from '../Card/Card';
import EmptyCard from '../EmptyCard/EmptyCard';
import Pagination from '../Pagination/Pagination';

// eslint-disable-next-line no-unused-vars
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

export default function CardsContainer() {
	const filteredCountries = useSelector((state) => state.filteredCountries);
	const { page, pageSize } = useSelector((state) => state.pagination);
	console.log(page, pageSize);

	return (
		<div className={style.container}>
			<div className={style.cardsContainer}>
				{filteredCountries.length === 0 && <EmptyCard />}

				{filteredCountries
					?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
					.map((country, index) => {
						return (
							<Card
								key={index}
								id={country.id}
								flag={country.flag}
								continent={country.continent}
								name={country.name}
							/>
						);
					})}
			</div>
			<div className={style.pagination}>
				<Pagination />
			</div>
		</div>
	);
}
