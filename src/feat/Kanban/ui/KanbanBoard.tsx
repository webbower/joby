import clsx from 'clsx';

import { Stack } from '~/ui/Layout/mod';
import { type ProductOrder } from '~/feat/Orders/data/ProductOrder';
import { getKanbanCardSummaryData } from '~/feat/Orders/mod';

import { KanbanCard } from './KanbanCard';

import css from './KanbanBoard.module.scss';

type KanbanCardsGroup = {
	id: string;
	title: string;
	items: ProductOrder[];
};

export type KanbanBoardProps = {
	cards?: KanbanCardsGroup[];
};

export const KanbanBoard = ({ cards = [] }: KanbanBoardProps) => (
	<div className={css.root}>
		{cards.map(({ id: columnId, title: columnTitle, items }) => (
			<section key={columnId} className={clsx(css.column)}>
				<h2 className={css.columnTitle}>{columnTitle}</h2>

				<Stack className={css.cards}>
					{items.map(item => (
						<KanbanCard
							key={`${item.constructor.name}-${item.id}`}
							title={item.title}
							subtitle={item.description}
							summaryData={getKanbanCardSummaryData(item)}
						/>
					))}
				</Stack>
			</section>
		))}
	</div>
);
