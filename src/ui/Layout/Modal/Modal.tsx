'use client';

import { createPortal } from 'react-dom';

import { useBooleanState, useEffectOnMounted } from '~/ui/Hooks/mod';
import { Button } from '~/ui/Actions/mod';

import css from './Modal.module.scss';

let rootEl: HTMLElement | null =
	typeof document !== 'undefined' ? document.getElementById('modalRoot') : null;

export type ModalProps = {
	isVisible?: boolean;
	title: string;
	children: React.ReactNode;
	onClose: () => void;
};

/**
 * A component to display content in a modal window
 *
 * @todo Add keyboard support (close on Esc, focus trapping)
 *
 * @param props Modal props
 * @returns A modal component
 */
export const Modal = ({ isVisible = false, title, children, onClose }: ModalProps) => {
	// NOTE This is a quick and dirty way to set up the Modal rendering, not the ideal way
	const [, { toggle: rerender }] = useBooleanState(false);
	useEffectOnMounted(() => {
		if (!rootEl) {
			rootEl = document.getElementById('modalRoot');
			rerender();
		}
	});

	return rootEl && isVisible
		? createPortal(
				<>
					<div className={css.root}>
						<div className={css.wrapper}>
							<header className={css.head}>
								<h2 className={css.title}>{title}</h2>
								<Button variant="icon" className={css.closeButton} onClick={onClose}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 18 18"
										width="18"
										height="18"
										strokeLinecap="round"
									>
										<line x1="4" y1="4" x2="14" y2="14" />
										<line x1="4" y1="14" x2="14" y2="4" />
									</svg>
								</Button>
							</header>
							<div className={css.body}>{children}</div>
						</div>
					</div>
					<div className={css.backdrop}></div>
				</>,
				rootEl,
			)
		: null;
};
