import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import * as modals from './modals';
import * as kanban from './kanban';
import * as productOrders from './productOrders';

const rootReducer = combineReducers({
	[modals.sliceName]: modals.reducer,
	[kanban.sliceName]: kanban.reducer,
	[productOrders.sliceName]: productOrders.reducer,
});

export type AppState = {
	[modals.sliceName]: modals.ModalState;
	[kanban.sliceName]: kanban.State;
	[productOrders.sliceName]: productOrders.State;
};

export const createInitialAppState = (stateOverrides: Partial<AppState> = {}): AppState => ({
	[modals.sliceName]: modals.createInitialState(),
	[kanban.sliceName]: kanban.createInitialState(),
	[productOrders.sliceName]: productOrders.createInitialState(),
	...stateOverrides,
});

export const createAppStore = (
	initialState = createInitialAppState(),
): ReturnType<typeof configureStore> =>
	configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});

export type AppStore = ReturnType<typeof createAppStore>;
