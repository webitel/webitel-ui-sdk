export const ComponentSize = {
  XXXS: '3xs',
  XXS: '2xs',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: '2xl',
  XXXL: '3xl',
} as const;

export type ComponentSize = (typeof ComponentSize)[keyof typeof ComponentSize];
