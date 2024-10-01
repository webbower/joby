import clsx from 'clsx';

import css from './Loading.module.scss';

export type LoadingTextProps = {
	color?: 'light' | 'dark';
	center?: boolean;
};

export const LoadingText = ({ color = 'dark', center = true }: LoadingTextProps) => (
	<div
		className={clsx(css.root, {
			[css.center]: center,
			[css.light]: color === 'light',
			[css.dark]: color === 'dark',
		})}
	>
		Loading...
	</div>
);
