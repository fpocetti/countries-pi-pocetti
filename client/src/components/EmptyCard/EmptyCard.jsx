import style from './EmptyCard.module.css';

export default function EmptyCard() {
	return (
		<div className={style.container}>
			<h3 className={style.title}>
				There are no countries matching your filters
			</h3>
			<h4>Please reset or search countries by Name</h4>
		</div>
	);
}
