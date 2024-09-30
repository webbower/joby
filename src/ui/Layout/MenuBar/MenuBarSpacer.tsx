import css from './MenuBar.module.scss';

/**
 * An spacer for the `<MenuBar>` component
 *
 * If you need to create a large gap between actions, add one of these to the chidlren of `<MenuBar>`
 *
 * @returns A component instance
 */ export const MenuBarSpacer = () => (
	<li className={css.spacer} role="presentation">
		&nbsp;
	</li>
);
