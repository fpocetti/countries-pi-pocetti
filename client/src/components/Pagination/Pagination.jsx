import { useState } from 'react';
import style from './Pagination.module.css';

export default function Pagination({ page, setPage, totalPageCount }) {
	const [disableNextButton, setDisableNextButton] = useState(false);
	const [disablePrevButton, setDisablePrevButton] = useState(true);

	const checkButtons = (newPage) => {
		if (newPage !== 1) setDisablePrevButton(false);
		if (newPage === 1) setDisablePrevButton(true);
		if (newPage === totalPageCount) setDisableNextButton(true);
		if (newPage < totalPageCount) setDisableNextButton(false);
		console.log('button Checked, page ', newPage);
	};

	function handleNext() {
		if (page < totalPageCount) {
			setPage((page) => {
				const nextPage = page + 1;
				checkButtons(nextPage);
				return nextPage;
			});
		}

		console.log('disable Next', disableNextButton, 'page ', page);
		console.log('disable Prev', disablePrevButton, 'page ', page);
	}

	const handlePrevious = () => {
		if (page !== 1) {
			setPage((page) => {
				const prevPage = page - 1;
				checkButtons(prevPage);
				return prevPage;
			});
		}
		console.log('disable Next', disableNextButton, 'page ', page);
		console.log('disable Prev', disablePrevButton, 'page ', page);
	};

	return (
		<div className={style.pagination}>
			<button
				onClick={handlePrevious}
				className={style.button}
				disabled={disablePrevButton}
			>
				{'< Previous'}
			</button>
			<p className={style.text}>
				Page {page} of {totalPageCount}
			</p>
			<button
				onClick={handleNext}
				className={style.button}
				disabled={disableNextButton}
			>
				{'Next >'}
			</button>
		</div>
	);
}
