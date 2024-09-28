import { useState } from 'react';

import { useConstant } from './useConstant';

type BooleanStateHookApi = {
	/** Change the state to {@link newState} */
	set: (newState: boolean) => void;
	/** Change the state to the initial value */
	reset: () => void;
	/** Change the state to `true` */
	on: () => void;
	/** Change the state to `false` */
	off: () => void;
	/** Change the state to the opposite of what it is currently */
	toggle: () => void;
};

/**
 * React state hook specialized to work with boolean values
 *
 * ```jsx
 * const EditScreen = () => {
 *   const [isModalVisible, { on: showModal, off: hideModal, toggle: toggleModal }] = useBooleanState();
 *
 *   const handleShowModalClick = () => {
 *     showModal();
 *   };
 *
 *   const handleModalClose = () => {
 *     hideModal();
 *   };
 *
 *   const handleToggleModalClick = () => {
 *     toggleModal();
 *   };
 *
 *   return (
 *     <div>
 *       <button type="button" onClick={handleShowModalClick}>Show modal</button>
 *       <button type="button" onClick={handleToggleModalClick}>{isModalVisible ? 'Hide modal' : 'Show modal'}</button>
 *       <Modal isVisible={isModalVisible} onClose={handleModalClose}>Lorem ipsum...</Modal>
 *     </div>
 *   );
 * };
 * ```
 *
 * @param [initialState=false] The initial state
 * @returns A tuple of the current state value and the hook API
 */
export const useBooleanState = (initialState = false): [boolean, BooleanStateHookApi] => {
	const [state, setState] = useState(initialState);
	const api = useConstant({
		set: setState,
		/**
		 * @note This will be the first initialState because `useConstant()` for the API captures the
		 * first value in this function definition closure.
		 */
		reset: () => {
			setState(initialState);
		},
		on: () => {
			setState(true);
		},
		off: () => {
			setState(false);
		},
		toggle: () => {
			setState(current => !current);
		},
	});

	return [state, api];
};
