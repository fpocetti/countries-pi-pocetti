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
	const { page, totalPageCount, pageSize } = useSelector(
		(state) => state.pagination
	);

	return (
		<div className={style.container}>
			<div>
				{filteredCountries.length === 0 ? (
					<EmptyCard className={style.emptyCard} />
				) : (
					<div className={style.pages}>
						<div className={style.cardsContainer}>
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
						{totalPageCount > 1 && (
							<div className={style.pagination}>
								<Pagination />
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
