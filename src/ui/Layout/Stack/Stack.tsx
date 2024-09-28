import clsx from 'clsx';

import css from './Stack.module.scss';

export type StackProps = {
	/** The children element(s) */
	children: React.ReactNode;
	/** An optional root class name */
	className?: string;
	/**
	 * The wrapper element to render
	 * @default 'div'
	 */
	as?:
		| 'div'
		| 'section'
		| 'article'
		| 'header'
		| 'footer'
		| 'aside'
		| 'nav'
		| 'ul'
		| 'ol'
		| 'dl'
		| 'menu';
};

/**
 * The Stack component creates consistent spacing between direct children
 *
 * @param props Component props
 * @returns A Stack component
 */
export const Stack = ({ as: Component = 'div', children, className }: StackProps) => (
	<Component className={clsx(css.root, className)}>{children}</Component>
);
