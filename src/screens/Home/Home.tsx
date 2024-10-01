import { KanbanBoard } from '~/feat/Kanban/mod.ui';
import { createKanbanBoardCardsData } from '~/feat/Kanban/mod.dev';
import { ProductOrderDetailsModal } from '~/feat/Orders/mod.ui';
import { Priority, ProductOrder } from '~/feat/Orders/mod';
import { Modals } from '~/feat/Modals/mod';
import { MenuBar, MenuBarAction, MenuBarSpacer } from '~/ui/Layout/mod';

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
	<>
		<h1 className={css.pageTitle}>Order Overview</h1>

		<MenuBar label="App Menu" className={css.appsMenu}>
			<MenuBarAction action="#" label="Dashboard" icon="joby" />
			<MenuBarAction action="#" label="Home" icon="home" />
			<MenuBarAction action="#" label="User" icon="user" />
			<MenuBarAction action="#" label="Settings" icon="settings" />
			<MenuBarAction active action="#" label="Product Order" icon="edit" />
			<MenuBarSpacer />
			<MenuBarAction action="#" label="Help" icon="help" />
		</MenuBar>

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
	</>
);
