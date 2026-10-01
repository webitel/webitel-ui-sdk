import type { FilterName } from '../../../../classes/Filter';
import { variableKeyFromFilterName } from '../../../../scripts/variableFilters';
import type { BaseFilterConfig } from '../../classes/FilterConfig';
import { FilterConfig } from '../../classes/FilterConfig';
import VariableKeyFilterValueField from './variable-key-filter-value-field.vue';
import VariableKeyFilterValuePreview from './variable-key-filter-value-preview.vue';

export interface IVariableKeyFilterConfig extends BaseFilterConfig {
	readonly variableKey: string;
}

export class VariableKeyFilterConfig
	extends FilterConfig
	implements IVariableKeyFilterConfig
{
	readonly variableKey: string;

	constructor({
		name,
		label,
	}: {
		name: FilterName;
		label: string;
	}) {
		super({
			name,
			valueInputComponent: VariableKeyFilterValueField,
			valuePreviewComponent: VariableKeyFilterValuePreview,
		});

		this.label = label;
		this.variableKey = variableKeyFromFilterName(name);
	}
}
