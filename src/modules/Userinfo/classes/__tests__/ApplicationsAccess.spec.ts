import { describe, expect, it } from 'vitest';

import { WfmSections, WtApplication } from '../../../../enums';
import ApplicationsAccess from '../ApplicationsAccess';

const wfmSections = [
	WfmSections.Agents,
	WfmSections.Schedules,
	WfmSections.ForecastCalculation,
	WfmSections.WorkingConditions,
];

describe('ApplicationsAccess', () => {
	it('includes WFM application with its sections', () => {
		const { access } = new ApplicationsAccess();

		expect(access[WtApplication.Wfm]._enabled).toBe(true);
		expect(access[WtApplication.Wfm]._locale).toBe(
			`WtApplication.${WtApplication.Wfm}.name`,
		);
		wfmSections.forEach((section) => {
			expect(access[WtApplication.Wfm][section]).toEqual({
				_enabled: true,
				_locale: `WtApplication.${WtApplication.Wfm}.sections.${section}`,
			});
		});
	});

	it('does not include lookups that are not moved to WFM yet', () => {
		const { access } = new ApplicationsAccess();

		expect(
			access[WtApplication.Wfm][WfmSections.ShiftTemplates],
		).toBeUndefined();
		expect(
			access[WtApplication.Wfm][WfmSections.PauseTemplates],
		).toBeUndefined();
	});

	it('restores WFM as disabled when it is missing from saved access', () => {
		const { access } = new ApplicationsAccess({
			access: {
				[WtApplication.Crm]: {
					_enabled: true,
				},
			},
		});

		expect(access[WtApplication.Wfm]._enabled).toBe(false);
		expect(access[WtApplication.Wfm][WfmSections.Agents]?._enabled).toBe(false);
	});
});
