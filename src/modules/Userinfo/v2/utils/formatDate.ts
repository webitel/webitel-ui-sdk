import { TIMEZONE_STORAGE_KEY } from '../constants/UserSettingsConstants';

export const formatDateToLocaleDateString = (
  date: string | Date,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const timezone =
    localStorage.getItem(TIMEZONE_STORAGE_KEY) ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Date(date).toLocaleDateString(locale, {
    ...options,
    timeZone: timezone,
  });
};

export const formatDateToLocalTimeString = (
  date: string | Date,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const timezone =
    localStorage.getItem(TIMEZONE_STORAGE_KEY) ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Date(date).toLocaleTimeString(locale, {
    ...options,
    timeZone: timezone,
  });
};

export const formatDateToLocalString = (
  date: string | Date,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const timezone =
    localStorage.getItem(TIMEZONE_STORAGE_KEY) ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Date(date).toLocaleString(locale, {
    ...options,
    timeZone: timezone,
  });
};
