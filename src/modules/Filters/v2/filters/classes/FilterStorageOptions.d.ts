import { FilterValue } from '../types/Filter';

export interface FilterStorageOptions {
  get: (name: string) => FilterValue;
  set: (name: string, value: FilterValue) => void;
}
