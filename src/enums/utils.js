import fp from 'lodash/fp';

/**
 * ts-style enums to pre-ts style enums (PascalCase to UPPERCASE keys)
 * */
// import upperCase from 'lodash/upperCase';
export const makeCompatEnum = (newEnum) =>
  fp.flow([
    fp.mapKeys(fp.upperCase),
    fp.mapKeys((str) => str.replaceAll(' ', '_')),
    // Object.entries,
    // // (entries) =>
    // //   entries.map(([key, value]) => [
    // //     fp.upperCase(key).replaceAll(' ', '_'),
    // //     value,
    // //   ]),
    // Object.fromEntries,
  ])(newEnum);
//# sourceMappingURL=utils.js.map
