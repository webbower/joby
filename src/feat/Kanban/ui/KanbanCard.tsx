'use client';

import { Button } from '~/ui/Actions/mod';
import { Priority } from '~/feat/Orders/mod';
import { PriorityChip } from '~/feat/Orders/mod.ui';
import { formatDate } from '~/lib/date/mod';
import { type Entries } from '~/lib/types/mod';

import css from './KanbanCard.module.scss';

export type KanbanCardProps = {
	/** The Kanban Card title */
	title: string;
	/** The Kanban Card summary */
	subtitle: string;
	/** The Summary data to display on the Kanban card */
	summaryData: Entries;
	/** Tags associated with the Kanban Card data */
	// tags: Array<{
	//   name: string;
	// }>
	onClick?: () => void;
};

export const KanbanCard = ({
	title,
	subtitle,
	summaryData,
	// tags = [],
	onClick = () => {},
}: KanbanCardProps) => (
	<article className={css.root} onClick={onClick}>
		<header className={css.head}>
			<h3 className={css.title}>{title}</h3>
			<p className={css.subtitle}>{subtitle}</p>
		</header>

		<ul className={css.details}>
			{summaryData.map(([label, value]) => (
				<li key={label}>
					<span className={css.detailsLabel}>{label}:</span>
					<span className={css.detailsValue}>
						{Priority.isPriority(value) ? (
							<PriorityChip priority={value} />
						) : value instanceof Date ? (
							formatDate(value)
						) : (
							String(value)
						)}
					</span>
				</li>
			))}
		</ul>

		<div className={css.tags}>
			<Button
				variant="text"
				onClick={() => {
					alert('Add a tag');
				}}
			>
				+Tag
			</Button>
		</div>
	</article>
);
