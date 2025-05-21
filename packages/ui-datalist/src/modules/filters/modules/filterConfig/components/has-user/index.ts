import { IWtSysTypeFilterConfig, WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import HasUserFilterValueField from './has-user-filter-value-field.vue';
import HasUserFilterValuePreview from './has-user-filter-value-preview.vue';

class HasUserFilterConfig extends WtSysTypeFilterConfig {
  readonly name = FilterOption.HasUser;
  valueInputComponent = HasUserFilterValueField;
  valuePreviewComponent = HasUserFilterValuePreview;
  noValidation?: boolean;

  constructor(params: { noValidation?: boolean } = {}) {
    super(params);
    if('noValidation' in params) {
      this.noValidation = params.noValidation;
    }
  }

}

export const createHasUserFilterConfig = (params) =>
  new HasUserFilterConfig(params);

export interface IHasUserFilterConfig extends IWtSysTypeFilterConfig {
  noValidation?: boolean;
}
