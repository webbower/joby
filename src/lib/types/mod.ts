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
