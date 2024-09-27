import { Priority } from './Priority';

type Timestamp = number;

type BaseModelFields = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
};

type BaseSerializedFields = {
	id: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
};

export type ProductFile = BaseModelFields & {
	title: string;
	description: string;
	thumbnailSrc: string;
	departmentId: string;
};

type ProductOrderPrototype = {
	toJSON(this: ProductOrder): ProductOrderSerialized;
	constructor: ProductOrderConstructor;
};

/**
 * An in-memory record representing a Product Order
 */
export type ProductOrder = BaseModelFields & {
	/** The title of the order */
	title: string;
	/** A summary description of the order */
	description: string;
	priority: Priority;
	dueDate: Date;
	tags: string[];
	part: string;
	partNumber: string;
	releaseStatus: string;
	drawingNumber: string;
	flightArticle: string;
	estimatedShippingDate: Date;
	material: string;
	materialStockSize: string;
	surfaceTreatment: string;
	machine: string;
	files: ProductFile[];
};

/**
 * A serialized representation of a {@link ProductOrder} for storage and network transmission
 */
export type ProductOrderSerialized = BaseSerializedFields & {
	title: string;
	description: string;
	priority: Priority;
	dueDate: Timestamp;
	tags: string[];
	part: string;
	partNumber: string;
	releaseStatus: string;
	drawingNumber: string;
	flightArticle: string;
	estimatedShippingDate: Timestamp;
	material: string;
	materialStockSize: string;
	surfaceTreatment: string;
	machine: string;
	files: ProductFile[];
};

/**
 * Constructor function for {@link ProductOrder} entries
 *
 * @constructor
 */
type ProductOrderConstructor = {
	(data: Partial<ProductOrder>): ProductOrder;
	fromJSON(data: ProductOrderSerialized): ProductOrder;
	prototype: ProductOrderPrototype;
};

export const ProductOrder: ProductOrderConstructor = ({
	id = '0',
	createdAt = new Date(),
	updatedAt = createdAt,
	title = 'Incomplete Product Order',
	description = '',
	priority = Priority.Standard,
	dueDate = new Date(),
	tags = [],
	part = 'Lorem Ipsum',
	partNumber = 'Lorem Ipsum',
	releaseStatus = 'Lorem Ipsum',
	drawingNumber = 'Lorem Ipsum',
	flightArticle = 'Lorem Ipsum',
	estimatedShippingDate = new Date(),
	material = 'Lorem Ipsum',
	materialStockSize = 'Lorem Ipsum',
	surfaceTreatment = 'Lorem Ipsum',
	machine = 'Lorem Ipsum',
	files = [],
}) =>
	Object.assign(Object.create(ProductOrder.prototype), {
		id,
		createdAt,
		updatedAt,
		title,
		description,
		priority,
		dueDate,
		tags,
		part,
		partNumber,
		releaseStatus,
		drawingNumber,
		flightArticle,
		estimatedShippingDate,
		material,
		materialStockSize,
		surfaceTreatment,
		machine,
		files,
	});

ProductOrder.prototype = {
	constructor: ProductOrder,
	toJSON() {
		const { createdAt, updatedAt, dueDate, estimatedShippingDate } = this;

		return {
			...this,
			createdAt: Number(createdAt),
			updatedAt: Number(updatedAt),
			dueDate: Number(dueDate),
			estimatedShippingDate: Number(estimatedShippingDate),
		};
	},
};

ProductOrder.fromJSON = data => {
	const { createdAt, updatedAt, dueDate, estimatedShippingDate } = data;

	return ProductOrder({
		...data,
		createdAt: new Date(createdAt),
		updatedAt: new Date(updatedAt),
		dueDate: new Date(dueDate),
		estimatedShippingDate: new Date(estimatedShippingDate),
	});
};
