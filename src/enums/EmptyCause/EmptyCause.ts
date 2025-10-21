export const EmptyCause = Object.freeze({
  ERROR: 'error',
  FILTERS: 'filters',
  EMPTY: 'empty',
});

export type EmptyCause = (typeof EmptyCause)[keyof typeof EmptyCause];
