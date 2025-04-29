/**
 * @description
 * Where will filter value most likely be used
 * i.e. for backend request or filter preview component
 *
 */
export const FilterValueConsumer = {
  // backend request
  API: 'api',
} as const;

export type FilterValueConsumer =
  (typeof FilterValueConsumer)[keyof typeof FilterValueConsumer];
