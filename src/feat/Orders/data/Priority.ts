/**
 * An enum for Priority values
 */

/**
 * Because TypeScript uses structural typing and Priority enum values have no custom fields and should be typed
 * nominally (i.e. is-a typing), the enum values will match an empty object type (e.g. `Record<PropertyKey, never>`)
 * which defeats the purpose because `{}` would match the type. The solution is to use a private and unique key on each
 * Priority enum value that can't be faked externally. Symbols fit this but we need to get the type of a single Symbol
 * instance which requires a few steps and a small amount of unintuitive type definition. This solution is based on
 * {@link https://stackoverflow.com/a/59120564}.
 */
// Define the unique, private Symbol value
const instSymbol: unique symbol = Symbol('PriorityInst');
// Get the type for this specific Symbol value
type PriorityInstanceSymbol = typeof instSymbol;

// TypeScript doesn't support using a specific Symbol type as a specific key for an object type, but the mapped type
// syntax seems to work. Now the `Priority` type must be an object with the specific Symbol instance above defined as a
// property key.
type Priority = { [Key in PriorityInstanceSymbol]: true };

type PriorityConstructor = {
	(name: string, value: number | string): Priority;
	prototype: {
		constructor: PriorityConstructor;
	};
	/**
	 * Convert a primitive string or value to a Priority instance
	 *
	 * @param nameOrValue The string or number to attempt to get the Priority value for
	 * @returns A Priority that matches the name or value, or undefined if no matching value is found
	 */
	from(nameOrValue?: string | number): Priority | undefined;
	/**
	 * A predicate function to test if a value is a Priority instance
	 *
	 * @param x Any value
	 * @returns true if the value is a Priority instance, false otherwise
	 */
	isPriority(x: unknown): x is Priority;
	Critical: Priority;
	High: Priority;
	Standard: Priority;
	/** A list of all the enum members for easy iteration */
	members: ReadonlyArray<Priority>;
};

/**
 * Private state used to prevent further creation of Priority instances
 */
let isClosed = false;

/**
 * A richer enum definition than TypeScript provides
 *
 * TypeScript enums only type check the underlying value but not the string "reverse lookup" value. Priority needs to be
 * usable as both a number for log level filtering and a string for the log message output. JS allows objects to behave
 * as string and number primitives in different contexts using well defined type coercion rules. And for type checking,
 * Priority values should match the type of the namespace value and be instances of the namespace value.
 *
 * This implementation groups all of this together in one place. TypeScript requires more explicitness to coerce objects
 * to strings and numbers in some cases, but we have single enum values that work in multiple cases:
 * - Satisfies `instanceof` comparison: `Priority.Critical instanceof Priority === true`
 * - Each enum value is only `===` equivalent to itself. TS enums can compare to literal number or string values.
 * - Can be order-compared using `>`, `>=`, `<`, `<=` for log filtering
 * - Can output the correct string representation using `String(Priority.Standard)`
 *
 * @param name The name of the Priority member
 * @param [value=name] The value of the Priority member. Defaults to {@link name}
 * @returns  A member item
 * @throws {Error} When called after member creation is closed
 */
const Priority: PriorityConstructor = (name, value = name) => {
	if (isClosed) {
		throw new Error('Priority has been frozen and cannot define more instances');
	}
	// Satisfies `instanceof` capabilities
	const inst = Object.create(Priority.prototype);
	Object.assign(inst, {
		[Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
			return hint === 'string' ? name : value;
		},
		valueOf() {
			return value;
		},
		toString() {
			return name;
		},
		toJSON() {
			return name;
		},
		// Satisfies TS structural typing to differentiate from an empty object
		[instSymbol]: true,
	});
	// Prevent the Priority instance from being modified
	return Object.freeze(inst);
};

const priorityNames = ['Critical', 'High', 'Standard'] as const;

Priority.prototype = {
	constructor: Priority,
};

// Define all enum members. They can be detached from the namespace for shorthand use as well.
Priority.Critical = Priority('Critical', 0);
Priority.High = Priority('High', 1);
Priority.Standard = Priority('Standard', 2);
Priority.members = [Priority.Critical, Priority.High, Priority.Standard] as const;
Priority.from = function from(nameOrValue) {
	if (!nameOrValue) {
		return undefined;
	}

	const foundName = priorityNames.find(name => {
		const inst = Priority[name];
		// First test the name, then test the `.valueOf()`/`.toPrimitive('default')`
		return nameOrValue === String(inst) || nameOrValue === Number(inst);
	});
	return foundName ? Priority[foundName] : undefined;
};
Priority.isPriority = function isPriority(x): x is Priority {
	return x instanceof Priority;
};

// Freeze the Priority enum to prevent creation of more instances and any modifications
isClosed = true;
Object.freeze(Priority);

export { Priority };
