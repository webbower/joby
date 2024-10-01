import { createAction, createReducer } from '@reduxjs/toolkit';

import { type KanbanCardsGroup } from '~/feat/Kanban/mod';

export type State = {
	loading: boolean;
	cards: KanbanCardsGroup[];
};

export const sliceName = 'kanban';
const actionName = (name: string) => `${sliceName}/${name}`;

export const createInitialState = ({
	loading = false,
	cards = [],
}: Partial<State> = {}): State => ({
	loading,
	cards,
});

///////// Action Creators /////////
export const startLoadingKanbanCards = createAction(actionName('LOAD'));
export const successLoadingKanbanCards = createAction(
	actionName('SUCCESS'),
	(cards: State['cards']) => ({ payload: { cards } }),
);
// TODO Add errorLoadingKanbanCards

///////// Selectors /////////
/**
 * Get all the Kanban Cards
 *
 * @returns The stored Kanban Cards
 */
export const selectKanbanCards = (state: State): State['cards'] => state.cards;

/**
 * Check if the Kanban data is currently loading
 *
 * @returns `true` if the data is loading, `false` otherwise
 */
export const selectIsKanbanLoading = (state: State): State['loading'] => state.loading;

///////// Reducer /////////
export const reducer = createReducer(createInitialState(), builder => {
	builder
		.addCase(startLoadingKanbanCards, state => {
			state.loading = true;
		})
		.addCase(successLoadingKanbanCards, (state, action) => {
			state.cards = action.payload.cards;
			state.loading = false;
		});
});
