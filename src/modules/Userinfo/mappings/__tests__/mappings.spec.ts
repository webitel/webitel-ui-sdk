import { describe, expect, it } from 'vitest';

import {
	AdminSections,
	WfmSections,
	WtApplication,
	WtObject,
} from '../../../../enums';
import { castWtObjectToUiSection } from '../../scripts/utils';

describe('mapWtObjectToUiSection', () => {
	it('maps agents to WFM Agents section', () => {
		expect(castWtObjectToUiSection(WtApplication.Wfm, WtObject.Agent)).toBe(
			WfmSections.Agents,
		);
	});

	it('keeps Admin mapping for lookups that are not moved to WFM yet', () => {
		expect(
			castWtObjectToUiSection(WtApplication.Admin, WtObject.PauseTemplate),
		).toBe(AdminSections.PauseTemplates);
		expect(
			castWtObjectToUiSection(WtApplication.Admin, WtObject.WorkingCondition),
		).toBe(AdminSections.WorkingConditions);
	});

	it('maps shift templates to WFM only', () => {
		expect(
			castWtObjectToUiSection(WtApplication.Wfm, WtObject.ShiftTemplate),
		).toBe(WfmSections.ShiftTemplates);
		expect(
			castWtObjectToUiSection(WtApplication.Admin, WtObject.ShiftTemplate),
		).toBeUndefined();
	});
});
