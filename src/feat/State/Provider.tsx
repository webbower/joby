'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { type AppStore, createAppStore } from './appStore';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = createAppStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};
