/**
 * JSX component utils
 *
 * @module lib/jsx
 */

const UNKNOWN_COMPONENT_NAME = 'UnknownComponent';

/**
 * Get the display name of a React component
 *
 * @param Component A React component or string native component name
 * @return The name of the component or empty string if no component is passed
 */
export const getComponentName = (Component: React.ComponentType | string): string => {
	// Handle missing data cases
	if (Component === '') {
		return UNKNOWN_COMPONENT_NAME;
	}

	return typeof Component === 'string'
		? Component
		: Component.displayName || Component.name || UNKNOWN_COMPONENT_NAME;
};

/**
 * Create a wrapped component name for use with HOCs
 *
 * @param BaseComponent The component to be wrapped
 * @param HocComponent The name of the wrapping component
 * @return A wrapped name generated from the 2 component names
 */
export const wrapComponentName = (
	BaseComponent: React.ComponentType | string,
	HocComponent: React.ComponentType,
): string => `${getComponentName(HocComponent)}(${getComponentName(BaseComponent)})`;
