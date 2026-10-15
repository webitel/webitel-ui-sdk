import { describe, expect, it } from 'vitest';

import { WfmSections, WtApplication, WtObject } from '../../../../enums';
import {
	castWtObjectToUiSection,
	shouldUseGlobalCrudActionAccessAsChecksSource,
} from '../../scripts/utils';

describe('mapWtObjectToUiSection', () => {
	it('maps agents to WFM Agents section', () => {
		expect(castWtObjectToUiSection(WtApplication.Wfm, WtObject.Agent)).toBe(
			WfmSections.Agents,
		);
	});

	it('maps shift templates to WFM only', () => {
		expect(
			castWtObjectToUiSection(WtApplication.Wfm, WtObject.ShiftTemplate),
		).toBe(WfmSections.ShiftTemplates);
		expect(
			castWtObjectToUiSection(WtApplication.Admin, WtObject.ShiftTemplate),
		).toBeUndefined();
	});

	it('maps pause templates to WFM only', () => {
		expect(
			castWtObjectToUiSection(WtApplication.Wfm, WtObject.PauseTemplate),
		).toBe(WfmSections.PauseTemplates);
		expect(
			castWtObjectToUiSection(WtApplication.Admin, WtObject.PauseTemplate),
		).toBeUndefined();
	});

	it('maps working conditions to WFM only', () => {
		expect(
			castWtObjectToUiSection(WtApplication.Wfm, WtObject.WorkingCondition),
		).toBe(WfmSections.WorkingConditions);
		expect(
			castWtObjectToUiSection(WtApplication.Admin, WtObject.WorkingCondition),
		).toBeUndefined();
	});

	it('maps forecast calculation to WFM only', () => {
		expect(
			castWtObjectToUiSection(WtApplication.Wfm, WtObject.ForecastCalculation),
		).toBe(WfmSections.ForecastCalculation);
		expect(
			castWtObjectToUiSection(
				WtApplication.Admin,
				WtObject.ForecastCalculation,
			),
		).toBeUndefined();
	});

	it('checks forecast calculation access by global CRUD permissions', () => {
		expect(
			shouldUseGlobalCrudActionAccessAsChecksSource(
				WtObject.ForecastCalculation,
			),
		).toBe(true);
	});
});
