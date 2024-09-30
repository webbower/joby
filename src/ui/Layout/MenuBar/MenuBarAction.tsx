import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { Button, Link } from '~/ui/Actions/mod';

import css from './MenuBar.module.scss';
import clsx from 'clsx';

type MenuBarActionProps = {
	/** The textual/a11y label of the action */
	label: string;
	/** The ID of the icon to display */
	icon: string;
	/**
	 * The action to perform for the component
	 *
	 * Either a string/URL for a link action or a click handler function for a button action
	 */
	action: string | URL | MouseEventHandler<HTMLButtonElement>;
	/** Whether the action is the currently active one */
	active?: boolean;
};

/**
 * Utility to determine if the `action` prop is for a link or button instance
 *
 * @param action The `action` prop
 * @returns `true` if {@link action} is for a link, `false` otherwise
 */
const isLinkAction = (action: MenuBarActionProps['action']): action is string | URL =>
	typeof action === 'string' || action instanceof URL;

/**
 * An action entry for the `<MenuBar>` component
 *
 * An action can be a link to navigate somewhere or a function to trigger custom JS
 *
 * @param props Component props
 * @returns A component instance
 */
export const MenuBarAction = ({ label, icon, action, active = false }: MenuBarActionProps) => {
	const contents = (
		<>
			<Image src={`/img/${icon}-icon.png`} alt="" width={40} height={40} />
			<span className="sr-only">{label}</span>
		</>
	);

	return (
		<li className={clsx(css.item, { [css.active]: active })}>
			{isLinkAction(action) ? (
				<Link href={String(action)} variant="graphic">
					{contents}
				</Link>
			) : (
				<Button variant="graphic" type="button" onClick={action}>
					{contents}
				</Button>
			)}
		</li>
	);
};
