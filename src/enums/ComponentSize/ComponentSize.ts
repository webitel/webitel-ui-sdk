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
  '4L': '4xl',
  '5L': '5xl',
  '6L': '6xl',
  '7L': '7xl',
  '8L': '8xl',
} as const;

export type ComponentSize = (typeof ComponentSize)[keyof typeof ComponentSize];
