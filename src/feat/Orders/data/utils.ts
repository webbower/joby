import { type ProductOrder } from './ProductOrder';
import { type KanbanCardProps } from '~/feat/Kanban/ui/KanbanCard';

/**
 * Get data from a {@link ProductOrder} to display as the summary data on a {@link KanbanCard}
 *
 * @param po The ProductOrder to pull data from
 * @returns Summary data to be displayed
 */
export const getKanbanCardSummaryData = (po: ProductOrder): KanbanCardProps['summaryData'] => {
	const { priority, dueDate } = po;
	return [
		['Priority', priority],
		['Due Date', dueDate],
	];
};
