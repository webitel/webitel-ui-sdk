import ComponentSize from '../enums/ComponentSize/ComponentSize.enum.js';

export enum eComponentSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

const numerics = Object.values(ComponentSize).reduce((nums, size, index) => {
  return {
    ...nums,
    [size]: index,
  };
}, {});

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
export const compareSize = (s1, s2) => {
  return numerics[s1] - numerics[s2];
};

/**
 * Check if s1 is smaller than s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */

export const smallerThen = (s1, s2) => {
  return compareSize(s1, s2) < 0;
};

/**
 * Check if s1 is smaller or equal to s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */
export const smallerOrEqual = (s1, s2) => {
  return compareSize(s1, s2) <= 0;
};

/**
 * Check if s1 is greater than s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */
export const greaterThen = (s1, s2) => {
  return compareSize(s1, s2) > 0;
};

/**
 * Check if s1 is greater or equal to s2
 * @param s1
 * @param s2
 * @returns {boolean}
 */
export const greaterOrEqual = (
  s1: eComponentSize,
  s2: eComponentSize,
): boolean => {
  return compareSize(s1, s2) >= 0;
};
