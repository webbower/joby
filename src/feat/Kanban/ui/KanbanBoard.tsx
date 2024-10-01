import { useState } from 'react';
import clsx from 'clsx';

import { LoadingText, Stack } from '~/ui/Layout/mod';
import { type ProductOrder } from '~/feat/Orders/data/ProductOrder';
import { getKanbanCardSummaryData } from '~/feat/Orders/mod';

import { KanbanCard } from './KanbanCard';

import css from './KanbanBoard.module.scss';

export type KanbanCardsGroup = {
	id: string;
	title: string;
	items: ProductOrder[];
};

export type KanbanBoardProps = {
	loading?: boolean;
	cards?: KanbanCardsGroup[];
	onItemClick?: (id: string) => void;
};

export const KanbanBoard = ({ loading = false, cards = [], onItemClick }: KanbanBoardProps) =>
	loading ? (
		<LoadingText center color="light" />
	) : (
		<div className={css.root}>
			{cards.map(({ id, title, items }) => (
				<KanbanColumn key={id} id={id} title={title} items={items} onItemClick={onItemClick} />
			))}
		</div>
	);

type KanbanColumnProps = KanbanCardsGroup & {
	onItemClick: KanbanBoardProps['onItemClick'];
};

const sortFns: Record<string, (a: ProductOrder, b: ProductOrder) => number> = {
	priority: (a, b) => Number(a.priority) - Number(b.priority),
};

const getOrderedItems = (
	sortBy: string,
	items: KanbanCardsGroup['items'],
): KanbanCardsGroup['items'] => {
	const sortFn = sortFns[sortBy];
	if (!sortBy || !sortFn) {
		return items;
	}

	return [...items].sort(sortFn);
};

const KanbanColumn = ({ id, title, items, onItemClick = () => {} }: KanbanColumnProps) => {
	const [sortBy, setSortBy] = useState('');

	return (
		<section className={clsx(css.column)}>
			<header className={css.columnHead}>
				<h2 className={css.columnTitle}>{title}</h2>

				<div className={css.sort}>
					<select
						className={css.sortOptions}
						onChange={ev => {
							setSortBy(ev.target.value);
						}}
					>
						<option value="">Sort by</option>
						<option value="priority">Priority</option>
					</select>
				</div>
			</header>

			<Stack className={css.cards}>
				{getOrderedItems(sortBy, items).map(item => (
					<KanbanCard
						key={`${item.constructor.name}-${item.id}`}
						title={item.title}
						subtitle={item.description}
						summaryData={getKanbanCardSummaryData(item)}
						onClick={() => {
							onItemClick(item.id);
						}}
					/>
				))}
			</Stack>
		</section>
	);
};
