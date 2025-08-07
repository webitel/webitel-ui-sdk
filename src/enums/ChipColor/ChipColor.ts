export const ChipColor = {
  MAIN: 'main',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  TRANSFER: 'transfer',
} as const;

export type ChipColor = (typeof ChipColor)[keyof typeof ChipColor];