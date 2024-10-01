import { createAction, createReducer } from '@reduxjs/toolkit';
import { Modals } from '~/feat/Modals/mod';
import { last } from '~/lib/arr/mod';

export type State = {
	visible: Modals[];
};

export const sliceName = 'modals';
const actionName = (name: string) => `${sliceName}/${name}`;

export const createInitialState = ({ visible = [] }: Partial<State> = {}): State => ({
	visible,
});

///////// Action Creators /////////
export const showModal = createAction(actionName('SHOW'), (id: Modals) => ({ payload: { id } }));
export const closeModal = createAction(actionName('CLOSE'));

///////// Selectors /////////
/**
 * Check if a specific modal is visible
 *
 * @param id A Modal ID
 * @returns true if the modal is visible, false otherwise
 */
export const selectIsModalVisible =
	(id: Modals) =>
	(state: State): boolean =>
		last(state.visible) === id;

///////// Reducer /////////
export const reducer = createReducer(createInitialState(), builder => {
	builder
		.addCase(showModal, (state, action) => {
			state.visible.push(action.payload.id);
		})
		.addCase(closeModal, state => {
			state.visible.pop();
		});
});
