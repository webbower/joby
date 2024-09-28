import type { Metadata } from 'next';
import { StoreProvider } from '~/feat/State/mod';

import './globals.scss';

export const metadata: Metadata = {
	title: 'Joby Aviation Homework by Matt Bower',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoreProvider>
			<html lang="en">
				<body>
					<div id="appRoot">{children}</div>
					<div id="modalRoot" />
				</body>
			</html>
		</StoreProvider>
	);
}
