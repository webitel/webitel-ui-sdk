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
  '4XL': '4xl',
  '5XL': '5xl',
  '6XL': '6xl',
  '7XL': '7xl',
  '8XL': '8xl',
} as const;

export type ComponentSize = (typeof ComponentSize)[keyof typeof ComponentSize];
