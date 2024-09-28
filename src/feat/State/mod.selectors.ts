/**
 * @module feat/State/selectors
 */

import { createSelector } from '@reduxjs/toolkit';
import { type Modals } from '~/feat/Modals/mod';

import { type AppState } from './appStore';
import * as modals from './modals';

const selectModals = (state: AppState): modals.ModalState => state[modals.sliceName];

export const selectIsModalVisible = (id: Modals) =>
	createSelector(selectModals, modals.selectIsModalVisible(id));
