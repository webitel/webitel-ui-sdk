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
  clearable?: boolean;
  hideLabel?: boolean;

  constructor(params: { noValidation?: boolean, clearable?: boolean, hideLabel?: boolean; } = {}) {
    super(params);
    if ('noValidation' in params) {
      this.noValidation = params.noValidation;
    }
    if('clearable' in params) {
      this.clearable = params.clearable;
    }
    if('hideLabel' in params) {
      this.hideLabel = params.hideLabel;
    }
  }
}

export const createHasUserFilterConfig = (params) =>
  new HasUserFilterConfig(params);

export interface IHasUserFilterConfig extends IWtSysTypeFilterConfig {
  noValidation?: boolean;
  clearable?: boolean;
  hideLabel?: boolean;
}
