/**
 * Utility types
 *
 * @module lib/types
 */

/**
 * An array of two-item tuples
 *
 * This structure is produced by `Object.prototype.entries()` and consumed by `Object.fromEntries()`,
 * among others
 */
export type Entries<V = unknown, K = string> = Array<[K, V]>;

/**
 * Converts an object type where all keys are made optional except those listed in RequiredKeys which become required
 *
 * ```ts
 * type MyProps = {
 *   prop1: string;
 *   prop2: number;
 *   prop3: string[];
 *   prop4: OtherType[];
 * }
 *
 * type Modified = PartialExcept<MyProps, 'prop1' | 'prop3'>;
 * // type Modified = {
 * //   prop1: string;
 * //   prop2?: number;
 * //   prop3: string[];
 * //   prop4?: OtherType[];
 * // }
 * ```
 */
export type PartialExcept<T, RequiredKeys extends keyof T> = Partial<Omit<T, RequiredKeys>> & {
	[K in RequiredKeys]: T[K];
};

/**
 * Given the `typeof` a JS object or array/tuple const, return a union type of all the values of the object or array
 *
 * <code>
 * // `MyEnum` can be used as a value or type
 * const MyEnum = {
 *   ONE: 'one',
 *   TWO: 'two',
 *   THREE: 'three',
 * } as const;
 * type MyEnum = Values<typeof MyEnum>; // 'one' | 'two' | 'three'
 *
 * // `MyUnion` can be used as a value or type
 * const MyUnion = ['one', 'two', 'three'] as const; // `as const` is required
 * type MyUnion = Values<typeof MyUnion>; // 'one' | 'two' | 'three'
 * </code>
 */
export type Values<T> = T extends readonly (infer U)[] ? U : T extends Record<string, any> ? T[keyof T] : never;
