import { Chip, ChipProps } from '~/ui/Data/mod';
import { Priority } from '../data/Priority';

const priorityToChipVariantMapping = {
	[String(Priority.Critical)]: 'danger',
	[String(Priority.High)]: 'warn',
	[String(Priority.Standard)]: 'info',
} as const;

const priorityToChipLabelMapping = {
	[String(Priority.Critical)]: 'Critical Path',
	[String(Priority.High)]: 'High Priority',
	[String(Priority.Standard)]: 'Standard',
} as const;

type PriorityChipProps = {
	priority: Priority;
	size?: ChipProps['size'];
};

/**
 * A specialized `<Chip>` component for displaying {@link Priority} data
 *
 * @param param0 Comopnent props
 * @returns A component instance
 */
export const PriorityChip = ({ priority, size }: PriorityChipProps) => (
	<Chip variant={priorityToChipVariantMapping[String(priority)]} size={size}>
		{priorityToChipLabelMapping[String(priority)]}
	</Chip>
);
