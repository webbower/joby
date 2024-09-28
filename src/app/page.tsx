'use client';

import { KanbanBoard } from '~/feat/Kanban/mod.ui';
import { createKanbanBoardCardsData } from '~/feat/Kanban/mod.dev';
import { ProductOrderDetailsModal } from '~/feat/Orders/mod.ui';
import { Priority, ProductOrder } from '~/feat/Orders/mod';

import css from './page.module.scss';
import { useBooleanState } from '~/ui/Hooks/useBooleanState';

const kanbanGroups: Array<[string, number]> = [
	['Last viewed', 1],
	['To Do', 5],
	['In Progress', 2],
	['In Review', 4],
	['Done', 6],
];

const Home = () => {
	const [modalIsVisible, { on: showModal, off: hideModal }] = useBooleanState();

	return (
		<div>
			<div className={css.kanbanWindow}>
				<KanbanBoard
					cards={createKanbanBoardCardsData({ groups: kanbanGroups })}
					onItemClick={showModal}
				/>
			</div>

			<ProductOrderDetailsModal
				isVisible={modalIsVisible}
				productOrder={ProductOrder({
					title: 'MO0912345678',
					priority: Priority.Standard,
				})}
				onClose={hideModal}
			/>
		</div>
	);
};

export default Home;
