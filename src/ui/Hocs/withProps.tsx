import { type ComponentProps, type ComponentType, type FunctionComponent } from 'react';
import { wrapComponentName } from '~/lib/jsx/mod';

/**
 * Higher order component to bind props to the wrapper component
 *
 * @param boundProps The props to bind
 * @returns A function that accepts a component to wrap
 */
export const withProps =
	<B extends Record<string, any> | ((ownProps: Record<string, any>) => Record<string, any>)>(
		boundProps: B,
	) =>
	(Component: ComponentType): ComponentType<Exclude<ComponentProps<typeof Component>, B>> => {
		const BoundProps: FunctionComponent = (props: ComponentProps<typeof Component>) => (
			<Component
				{...props}
				{...(typeof boundProps === 'function' ? boundProps(props) : boundProps)}
			/>
		);

		BoundProps.displayName = wrapComponentName(Component, BoundProps);

		return BoundProps;
	};
