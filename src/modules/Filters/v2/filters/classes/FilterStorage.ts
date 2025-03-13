import { FilterValue } from '../types/Filter';
import type { FilterStorageOptions } from './FilterStorageOptions';

export class BrowserFilterStorage implements FilterStorageOptions {
  constructor(private prefix: string) {}

  get(name: string): FilterValue {
    const value = localStorage.getItem(`filters:${this.prefix}:${name}`);
    return value ? JSON.parse(value) : undefined;
  }

  set(name: string, value: FilterValue): void {
    localStorage.setItem(
      `filters:${this.prefix}:${name}`,
      JSON.stringify(value),
    );
  }
}

export class QueryFilterStorage implements FilterStorageOptions {
  constructor(private prefix: string) {}

  get(name: string): FilterValue {
    const url = new URL(window.location.href);
    const value = url.searchParams.get(`${this.prefix}:${name}`);
    return value ? JSON.parse(value) : undefined;
  }

  set(name: string, value: FilterValue): void {
    const url = new URL(window.location.href);
    url.searchParams.set(`${this.prefix}:${name}`, JSON.stringify(value));
    window.history.pushState({}, '', url.toString());
  }
}
