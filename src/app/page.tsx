'use client';

import { KanbanBoard } from '~/feat/Kanban/mod.ui';

import css from './page.module.scss';
import { createKanbanBoardCardsData } from '~/feat/Kanban/mod.dev';

const kanbanGroups: Array<[string, number]> = [
	['Last viewed', 1],
	['To Do', 5],
	['In Progress', 2],
	['In Review', 4],
	['Done', 6],
];

const Home = () => (
	<div>
		<div className={css.kanbanWindow}>
			<KanbanBoard cards={createKanbanBoardCardsData({ groups: kanbanGroups })} />
		</div>
	</div>
);

export default Home;
