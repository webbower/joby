import { Values } from '~/lib/types/mod';

export const Modals = {
	ProductDetail: 'ProductDetail',
} as const;
export type Modals = Values<typeof Modals>;
