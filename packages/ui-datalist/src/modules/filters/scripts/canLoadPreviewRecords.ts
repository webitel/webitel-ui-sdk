import type { DataField } from '@webitel/api-services/gen/models';
import type { WtObject } from '@webitel/ui-sdk/enums';
import {
	type FilterHasReadAccess,
	hasLookupFieldReadAccess,
} from '@webitel/ui-sdk/modules/Userinfo';

import type { AnyFilterConfig } from '../modules/filterConfig/classes/FilterConfig';

const isCustomLookupConfig = (
	config: AnyFilterConfig,
): config is AnyFilterConfig & {
	field: DataField;
} => 'field' in config;

const readAccessObject = (config: AnyFilterConfig): WtObject | undefined => {
	if (!('searchRecords' in config)) return undefined;
	if (!('accessObject' in config.searchRecords)) return undefined;

	return config.searchRecords.accessObject as WtObject | undefined;
};

export const canLoadPreviewRecords = (
	config: AnyFilterConfig,
	checker: FilterHasReadAccess | undefined,
) => {
	if (isCustomLookupConfig(config)) {
		return hasLookupFieldReadAccess(config.field, checker);
	}

	const accessObject = readAccessObject(config);
	if (!accessObject) return true;

	return checker?.(accessObject) ?? false;
};
