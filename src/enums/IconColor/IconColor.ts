export const IconColor = {
  DEFAULT: 'default',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  PRIMARY: 'primary',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  ON_DARK: 'on-dark',
  ON_LIGHT: 'on-light',
  ON_PRIMARY: 'on-primary',
  INFO: 'info',
  CHAT: 'chat',
  TRANSFER: 'transfer',
  JOB: 'job',
} as const;

export type IconColor = (typeof IconColor)[keyof typeof IconColor];