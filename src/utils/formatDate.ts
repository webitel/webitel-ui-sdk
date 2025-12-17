import { uk } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

import { FormatDateMode } from '../enums';
import { TIMEZONE_STORAGE_KEY } from '../modules/Userinfo/v2/constants/UserSettingsConstants';

function getUserTimeZone(): string {
  return (
    localStorage.getItem(TIMEZONE_STORAGE_KEY) ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
}

export function formatDate(
  date: string | number | Date,
  to: typeof FormatDateMode[keyof typeof FormatDateMode],
): string {
  const timeZone = getUserTimeZone();

  // https://date-fns.org/v4.1.0/docs/format
  const formatStringMap = {
    date: 'P', // dd.MM.yyyy (13.11.2025)
    time: 'p', // HH:mm (15:53)
    datetime: 'Ppp', // dd.MM.yyyy, HH:mm:ss (13.11.2025, 15:53:00)
    datetimeShort: 'Pp', // dd.MM.yyyy, HH:mm (13.11.2025, 15:53)
  };

  return formatInTimeZone(date, timeZone, formatStringMap[to], { locale: uk });
}
