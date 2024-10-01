'use client';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { Modals } from '~/feat/Modals/mod';
import {
	selectDisplayedProductOrder,
	selectIsKanbanLoading,
	selectIsModalVisible,
	selectIsProductOrderLoading,
	selectKanbanCards,
} from '~/feat/State/mod.selectors';
import { type AppState } from '~/feat/State/mod';
import { withProps } from '~/ui/Hocs/mod';
import { createKanbanBoardCardsData } from '~/feat/Kanban/mod.dev';

import { Home } from '~/screens/Home/Home';
import {
	closeModal,
	showModal,
	showProductOrderInModal,
	startLoadingKanbanCards,
	startLoadingProductOrder,
	successLoadingKanbanCards,
	successLoadingProductOrder,
} from '~/feat/State/mod.actions';
import { KanbanCardsGroup } from '~/feat/Kanban/mod';
import { ProductOrder } from '~/feat/Orders/mod';

const mapStateToProps = (state: AppState) => ({
	productDetailsModalIsVisible: selectIsModalVisible(Modals.ProductDetail)(state),
	kanbanIsLoading: selectIsKanbanLoading(state),
	kanbanCards: selectKanbanCards(state),
	modalIsLoading: selectIsProductOrderLoading(state),
	displayedProductOrder: selectDisplayedProductOrder(state),
});

const mapDispatchToProps = {
	showModal,
	closeModal,
	startLoadingKanbanCards,
	successLoadingKanbanCards,
	startLoadingProductOrder,
	successLoadingProductOrder,
	showProductOrderInModal,
} as const;

const kanbanGroups: Array<[string, number]> = [
	['Last viewed', 1],
	['To Do', 5],
	['In Progress', 2],
	['In Review', 4],
	['Done', 6],
];

const dependencies = (
	ownProps: typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>,
) => ({
	loadProductOrderCards: () => {
		ownProps.startLoadingKanbanCards();
		return new Promise<KanbanCardsGroup[]>(resolve => {
			setTimeout(() => {
				resolve(createKanbanBoardCardsData({ groups: kanbanGroups }));
			}, 1500);
		}).then(ownProps.successLoadingKanbanCards);
	},
	loadProductOrderDetail: (id: string) => {
		ownProps.startLoadingProductOrder();
		return new Promise<ProductOrder>(resolve => {
			setTimeout(() => {
				resolve(ProductOrder({ id }));
			}, 1500);
		}).then(productOrder => {
			ownProps.successLoadingProductOrder(productOrder);
			ownProps.showProductOrderInModal(productOrder.id);
		});
	},
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withProps(dependencies))(Home);
