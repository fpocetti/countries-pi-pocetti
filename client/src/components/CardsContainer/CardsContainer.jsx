/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Card from '../Card/Card';
import EmptyCard from '../EmptyCard/EmptyCard';
import Pagination from '../Pagination/Pagination';

// eslint-disable-next-line no-unused-vars
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

export default function CardsContainer() {
	const filteredCountries = useSelector((state) => state.filteredCountries);

	const [page, setPage] = useState(1);
	const PAGE_SIZE = 10;
	const countriesCount = filteredCountries.length;
	const totalPageCount = Math.ceil(countriesCount / PAGE_SIZE);

	return (
		<div className={style.container}>
			<div className={style.cardsContainer}>
				{filteredCountries.length === 0 && <EmptyCard />}

				{filteredCountries
					?.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE)
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
				<Pagination
					page={page}
					setPage={setPage}
					totalPageCount={totalPageCount}
				/>
			</div>
		</div>
	);
}
