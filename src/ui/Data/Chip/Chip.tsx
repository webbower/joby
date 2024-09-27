import clsx from 'clsx';
import css from './Chip.module.scss';

export type ChipVariant = 'danger' | 'warn' | 'info';

export type ChipProps = {
	/** The displayed text label */
	children: string;
	/** The variant to display */
	variant: ChipVariant;
};

/**
 * A Chip is a compact piece of data, usually designed to stand out, often used for labels and tags
 *
 * @param props Component props
 * @returns A Chip component instance
 */
export const Chip = ({ variant, children }: ChipProps) => (
	<span className={clsx(css.root, css[`variant-${variant}`])}>{children}</span>
);
