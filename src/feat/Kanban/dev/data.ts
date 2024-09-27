import { type KanbanBoardProps } from '../ui/KanbanBoard';
import { ProductOrder, Priority } from '~/feat/Orders/mod';

/**
 * Utility function to pick each Priority member in order and loop the end
 *
 * @private
 */
function* getNextPriorityMember(): Generator<Priority> {
	let index = 0;
	const len = Priority.members.length;

	while (true) {
		yield Priority.members[index++];
		index %= len;
	}
}

type CreateKanbanBoardDataConfig = {
	/** A tuple list of Kanban group titles and cards per group to generate  */
	groups: Array<[string, number]>;
};

/**
 * Generate Kanban board data for visual testing
 *
 * @param config Config data to generate Kanban Board cards data
 * @returns A generated amount of Kanban Board data
 */
export const createKanbanBoardCardsData = ({
	groups,
}: CreateKanbanBoardDataConfig): KanbanBoardProps['cards'] => {
	const priorityGenerator = getNextPriorityMember();
	let id = 0;
	return groups.reduce<NonNullable<KanbanBoardProps['cards']>>((gs, [title, cardCount], i) => {
		const items = Array.from({ length: cardCount }, () =>
			ProductOrder({
				id: String(id++),
				title: `MO123456789${id}`,
				description: 'Order description',
				priority: priorityGenerator.next().value,
			}),
		);
		const groupEntry = {
			id: String(i),
			title,
			items,
		};
		gs.push(groupEntry);
		return gs;
	}, []);
};
