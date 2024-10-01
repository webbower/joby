import { createAction, createReducer } from '@reduxjs/toolkit';

import { type ProductOrder } from '../Orders/mod';

export type State = {
	loading: boolean;
	displayed: string | null;
	db: Record<string, ProductOrder>;
};

export const sliceName = 'productOrders';
const actionName = (name: string) => `${sliceName}/${name}`;

export const createInitialState = ({
	loading = false,
	displayed = null,
	db = {},
}: Partial<State> = {}): State => ({
	loading,
	displayed,
	db,
});

///////// Action Creators /////////
export const startLoadingProductOrder = createAction(actionName('LOAD'));
export const successLoadingProductOrder = createAction(
	actionName('SUCCESS'),
	(productOrder: ProductOrder) => ({ payload: { productOrder } }),
);
export const showProductOrderInModal = createAction(
	actionName('SHOW'),
	(id: NonNullable<State['displayed']>) => ({ payload: { id } }),
);

///////// Selector /////////
/**
 * Get the currently displayed productOrder
 *
 * @param id The id of the ProductOrder to get
 * @returns The ProductOrder if it has been loaded, or `null`
 */
export const selectDisplayedProductOrder = (state: State): ProductOrder | null =>
	state.displayed ? state.db[state.displayed] : null;

/**
 * Check if the ProductOrder data is currently loading
 *
 * @returns `true` if the data is loading, `false` otherwise
 */
export const selectIsProductOrderLoading = (state: State): State['loading'] => state.loading;

///////// Reducer /////////
export const reducer = createReducer(createInitialState(), builder => {
	builder
		.addCase(startLoadingProductOrder, state => {
			state.loading = true;
		})
		.addCase(successLoadingProductOrder, (state, action) => {
			const { productOrder } = action.payload;
			state.db[productOrder.id] = productOrder;
			state.loading = false;
		})
		.addCase(showProductOrderInModal, (state, action) => {
			const { id } = action.payload;
			if (state.db[id]) {
				state.displayed = id;
			}
		});
});
