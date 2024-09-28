import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import * as modals from './modals';

const rootReducer = combineReducers({
	[modals.sliceName]: modals.reducer,
});

export type AppState = {
	[modals.sliceName]: modals.ModalState;
};

export const createInitialAppState = (stateOverrides: Partial<AppState> = {}): AppState => ({
	[modals.sliceName]: modals.createInitialState(),
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
