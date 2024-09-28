import { KanbanBoard } from '~/feat/Kanban/mod.ui';
import { createKanbanBoardCardsData } from '~/feat/Kanban/mod.dev';
import { ProductOrderDetailsModal } from '~/feat/Orders/mod.ui';
import { Priority, ProductOrder } from '~/feat/Orders/mod';
import { Modals } from '~/feat/Modals/mod';

import css from './Home.module.scss';

const kanbanGroups: Array<[string, number]> = [
	['Last viewed', 1],
	['To Do', 5],
	['In Progress', 2],
	['In Review', 4],
	['Done', 6],
];

type HomeProps = {
	productDetailsModalIsVisible: boolean;
	showModal: (id: Modals) => void;
	closeModal: () => void;
};

export const Home = ({ productDetailsModalIsVisible, showModal, closeModal }: HomeProps) => (
	<div>
		<div className={css.kanbanWindow}>
			<KanbanBoard
				cards={createKanbanBoardCardsData({ groups: kanbanGroups })}
				onItemClick={() => showModal(Modals.ProductDetail)}
			/>
		</div>

		<ProductOrderDetailsModal
			isVisible={productDetailsModalIsVisible}
			productOrder={ProductOrder({
				title: 'MO0912345678',
				priority: Priority.Standard,
			})}
			onClose={closeModal}
		/>
	</div>
);
