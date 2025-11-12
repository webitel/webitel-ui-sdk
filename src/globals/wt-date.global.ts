import { TIMEZONE_STORAGE_KEY } from '../modules/Userinfo/v2/constants/UserSettingsConstants';

export class WTDate extends Date {
  timeZone?: string;

  constructor(value?: number | string | Date) {
    super(value instanceof Date ? value.getTime() : value);
    this.timeZone = this.getStoredTimezone() ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  private getStoredTimezone(): string | null {
    return localStorage.getItem(TIMEZONE_STORAGE_KEY);
  }

  private formatWithTimezone(locale?: string | string[], options?: Intl.DateTimeFormatOptions): string {
    const formatOptions: Intl.DateTimeFormatOptions = {
      timeZone: this.timeZone,
      ...options,
    };
    return new Intl.DateTimeFormat(locale, formatOptions).format(this);
  }


  toLocaleString(locale?: string | string[], options?: Intl.DateTimeFormatOptions) {
    return this.formatWithTimezone(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      ...options,
    });
  }

  toLocaleDateString(locale?: string | string[], options?: Intl.DateTimeFormatOptions) {
    return this.formatWithTimezone(locale, options);
  }

  toLocaleTimeString(locale?: string | string[], options?: Intl.DateTimeFormatOptions) {
    return this.formatWithTimezone(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      ...options,
    });
  }


}

if (!globalThis.WTDate) {
  globalThis.WTDate = WTDate;
}
