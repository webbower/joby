import { type MouseEventHandler } from 'react';
import { default as NextLink } from 'next/link';
import clsx from 'clsx';
import css from './Link.module.scss';

export type LinkProps = {
	variant: 'default' | 'graphic';
	href: string;
	className?: string;
	active?: boolean;
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const Link = ({
	variant = 'default',
	href,
	className,
	active = false,
	children,
	onClick,
}: LinkProps) => (
	<NextLink
		href={href}
		className={clsx(css.root, { [css.active]: active }, css[`variant-${variant}`], className)}
		onClick={onClick}
	>
		{children}
	</NextLink>
);
