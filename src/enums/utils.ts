import fp from 'lodash/fp';

/**
 * ts-style enums to pre-ts style enums (PascalCase to UPPERCASE keys)
 * */
// import upperCase from 'lodash/upperCase';

export const makeCompatEnum = (newEnum: Record<string, unknown>) =>
  fp.flow([
    fp.mapKeys(fp.upperCase),
    fp.mapKeys((str: string) => str.replaceAll(' ', '_')),
    // Object.entries,
    // // (entries) =>
    // //   entries.map(([key, value]) => [
    // //     fp.upperCase(key).replaceAll(' ', '_'),
    // //     value,
    // //   ]),
    // Object.fromEntries,
  ])(newEnum);
