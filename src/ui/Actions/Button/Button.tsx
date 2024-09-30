import { type MouseEventHandler } from 'react';
import clsx from 'clsx';
import css from './Button.module.scss';

export type ButtonProps = {
	variant: 'primary' | 'text' | 'graphic';
	type?: 'button' | 'submit';
	className?: string;
	pressed?: boolean;
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
	variant,
	type = 'button',
	className,
	pressed = false,
	children,
	onClick = () => {},
}: ButtonProps) => (
	<button
		type={type}
		className={clsx(css.root, css[`variant-${variant}`], className)}
		onClick={onClick}
		aria-pressed={pressed}
	>
		{children}
	</button>
);
