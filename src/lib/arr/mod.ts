/**
 * Array utilities
 *
 * @module lib/arr
 */
/**
 * Get the last element of an array
 *
 * @param arr Any array like value
 * @returns The last value of the array, or undefined for empty arrays
 */
export const last = <T>(arr: T[]): T | undefined => arr[arr.length - 1];
