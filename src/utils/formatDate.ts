import type { Locale } from 'date-fns/locale';
import { enUS, es, kk, pl, ro, ru, uk, uz, vi } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

import { TIMEZONE_STORAGE_KEY } from '../modules/Userinfo/v2/constants/UserSettingsConstants';

const localeMap: Record<string, Locale> = {
  en: enUS,
  ru: ru,
  uk: uk,
  es: es,
  kz: kk,
  pl: pl,
  ro: ro,
  uz: uz,
  vi: vi,
};

function getUserTimeZone(): string {
  return (
    localStorage.getItem(TIMEZONE_STORAGE_KEY) ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
}

function getUserLocale(): Locale {
  const lang = localStorage.getItem('lang') || 'en';
  return localeMap[lang] || enUS;
}

export function formatDate(
  date: string | number | Date,
  to: 'date' | 'time' | 'datetime',
): string {
  const timeZone = getUserTimeZone();
  const locale = getUserLocale();

  // https://date-fns.org/v4.1.0/docs/format
  const formatStaringMap = {
    date: 'P',
    time: 'p',
    datetime: 'Ppp',
  };

  return formatInTimeZone(date, timeZone, formatStaringMap[to], { locale });
}
