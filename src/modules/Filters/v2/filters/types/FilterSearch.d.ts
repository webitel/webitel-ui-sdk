import { Validation } from '@vuelidate/core';

import { FilterLabel, FilterValue } from './Filter';

export interface FilterSearch {
  value: FilterValue;
  text: FilterLabel;
  hint?: string | undefined;
  v?: Validation | undefined;
}
