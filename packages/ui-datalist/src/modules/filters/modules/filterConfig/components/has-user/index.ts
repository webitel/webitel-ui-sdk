import { IWtSysTypeFilterConfig, WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import HasUserFilterValueField from './has-user-filter-value-field.vue';
import HasUserFilterValuePreview from './has-user-filter-value-preview.vue';

// Тут додала конфіг, бо треба обнулити валідацію і ще парочку параметрів

class HasUserFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.HasUser;
  valueInputComponent = HasUserFilterValueField;
  valuePreviewComponent = HasUserFilterValuePreview;
  noValidation?: boolean;
  notDeletable: boolean;
  hideLabel?: boolean;

  constructor(params: { noValidation?: boolean, notDeletable?: boolean, hideLabel?: boolean; } = {}) {
    super(params);
    ['noValidation', 'notDeletable', 'hideLabel'].forEach((key) => {
      if (key in params) {
        this[key] = params[key];
      }
    });
  }
}

export const createHasUserFilterConfig = (params) =>
  new HasUserFilterConfig(params);

export interface IHasUserFilterConfig extends IWtSysTypeFilterConfig {
  noValidation?: boolean;
  notDeletable?: boolean;
  hideLabel?: boolean;
}
