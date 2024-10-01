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

export const KanbanBoard = ({
	loading = false,
	cards = [],
	onItemClick = () => {},
}: KanbanBoardProps) =>
	loading ? (
		<LoadingText center color="light" />
	) : (
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
								onClick={() => {
									onItemClick(item.id);
								}}
							/>
						))}
					</Stack>
				</section>
			))}
		</div>
	);
