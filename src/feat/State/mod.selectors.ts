/**
 * @module feat/State/selectors
 */

import { createSelector } from '@reduxjs/toolkit';
import { type Modals } from '~/feat/Modals/mod';

import { type AppState } from './appStore';
import * as modals from './modals';
import * as kanban from './kanban';
import * as productOrders from './productOrders';

const selectModals = (state: AppState): modals.ModalState => state[modals.sliceName];
export const selectIsModalVisible = (id: Modals) =>
	createSelector(selectModals, modals.selectIsModalVisible(id));

const selectKanban = (state: AppState): kanban.State => state[kanban.sliceName];
export const selectKanbanCards = createSelector(selectKanban, kanban.selectKanbanCards);
export const selectIsKanbanLoading = createSelector(selectKanban, kanban.selectIsKanbanLoading);

const selectProductOrders = (state: AppState): productOrders.State =>
	state[productOrders.sliceName];
export const selectDisplayedProductOrder = createSelector(
	selectProductOrders,
	productOrders.selectDisplayedProductOrder,
);
export const selectIsProductOrderLoading = createSelector(
	selectProductOrders,
	productOrders.selectIsProductOrderLoading,
);