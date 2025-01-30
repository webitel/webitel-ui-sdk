import { ComponentSize } from '../enums/ComponentSize/ComponentSize';
/**
 * Compare two sizes, returning a number indicating the difference between them.
 *
 * @param s1
 * @param s2
 * @returns {number}
 *
 * @example
 * compareSize(ComponentSize.XS, ComponentSize.MD); // true
 * compareSize(ComponentSize.LG, ComponentSize.SM); // false
 */
export declare const compareSize: (s1: any, s2: any) => number;
/**
 * Check if s1 is smaller than s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */
export declare const smallerThen: (s1: any, s2: any) => boolean;
/**
 * Check if s1 is smaller or equal to s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */
export declare const smallerOrEqual: (s1: any, s2: any) => boolean;
/**
 * Check if s1 is greater than s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */
export declare const greaterThen: (s1: any, s2: any) => boolean;
/**
 * Check if s1 is greater or equal to s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */
export declare const greaterOrEqual: (s1: ComponentSize, s2: ComponentSize) => boolean;
//# sourceMappingURL=compareSize.d.ts.map