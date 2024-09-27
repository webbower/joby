'use client';

import { Chip } from '~/ui/Data/mod';
import { Button } from '~/ui/Actions/mod';
import { Priority } from '~/feat/Orders/mod';
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
};

const priorityToChipVariantMapping = {
	[String(Priority.Critical)]: 'danger',
	[String(Priority.High)]: 'warn',
	[String(Priority.Standard)]: 'info',
} as const;

const priorityToChipLabelMapping = {
	[String(Priority.Critical)]: 'Critical Path',
	[String(Priority.High)]: 'High Priority',
	[String(Priority.Standard)]: 'Standard',
} as const;

const PriorityChip = ({ priority }: { priority: Priority }) => (
	<Chip variant={priorityToChipVariantMapping[String(priority)]}>
		{priorityToChipLabelMapping[String(priority)]}
	</Chip>
);

export const KanbanCard = ({
	title,
	subtitle,
	summaryData,
	// tags = [],
}: KanbanCardProps) => (
	<article className={css.root}>
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
				type="button"
				onClick={() => {
					alert('Add a tag');
				}}
			>
				+Tag
			</Button>
		</div>
	</article>
);
