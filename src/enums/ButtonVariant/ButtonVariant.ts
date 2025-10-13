export const ButtonVariant = {
  ACTIVE: 'active',
  OUTLINED: 'outlined',
  TEXT: 'text',
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];