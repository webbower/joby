import clsx from 'clsx';
import css from './MenuBar.module.scss';

type MenuBarProps = {
	/** The a11y label of the menu bar */
	label: string;
	/** `<MenuBarAction />` and `<MenuBarSpacer />` components */
	children: React.ReactNode;
	/** Optional CSS class to apply to the root element */
	className?: string;
	/** The orientation of the Menu Bar */
	orientation?: 'horizontal' | 'vertical';
};

/**
 * A Menu Bar component that supports horizontal and vertical layout and links or JS actions
 *
 * Use with `<MenuBarAction />` and `<MenuBarSpacer />` as children to populate the menu bar actions
 *
 * @param props Component props
 * @returns A component instance
 */
export const MenuBar = ({ label, children, className, orientation = 'vertical' }: MenuBarProps) => (
	<nav className={clsx(css.root, css[`orientation-${orientation}`], className)} aria-label={label}>
		<ul className={css.menu}>{children}</ul>
	</nav>
);
