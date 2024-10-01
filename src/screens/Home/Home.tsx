import { KanbanBoard, type KanbanCardsGroup } from '~/feat/Kanban/mod';
import { ProductOrderDetailsModal } from '~/feat/Orders/mod.ui';
import { ProductOrder } from '~/feat/Orders/mod';
import { Modals } from '~/feat/Modals/mod';
import { MenuBar, MenuBarAction, MenuBarSpacer } from '~/ui/Layout/mod';
import { useEffectOnMounted } from '~/ui/Hooks/mod';

import css from './Home.module.scss';

type HomeProps = {
	productDetailsModalIsVisible: boolean;
	kanbanCards?: KanbanCardsGroup[];
	kanbanIsLoading: boolean;
	modalIsLoading: boolean;
	displayedProductOrder: ProductOrder | null;
	showModal: (id: Modals) => void;
	closeModal: () => void;

	// Dependencies
	loadProductOrderCards: () => Promise<KanbanCardsGroup[]>;
	loadProductOrderDetail: (id: string) => Promise<ProductOrder>;
};

export const Home = ({
	productDetailsModalIsVisible,
	kanbanCards = [],
	kanbanIsLoading,
	modalIsLoading,
	displayedProductOrder = null,
	showModal,
	closeModal,
	loadProductOrderCards,
	loadProductOrderDetail,
}: HomeProps) => {
	useEffectOnMounted(() => {
		loadProductOrderCards();
	});

	return (
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
					loading={kanbanIsLoading}
					cards={kanbanCards}
					onItemClick={id => {
						showModal(Modals.ProductDetail);
						loadProductOrderDetail(id);
					}}
				/>
			</div>

			<ProductOrderDetailsModal
				isVisible={productDetailsModalIsVisible}
				loading={modalIsLoading}
				productOrder={displayedProductOrder}
				onClose={closeModal}
			/>
		</>
	);
};
