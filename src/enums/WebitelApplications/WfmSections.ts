export const WfmSections = {
	Agents: 'agents',
	Schedules: 'schedules',

	// CONFIGURATION - LOOKUPS
	ShiftTemplates: 'shift-templates',
	PauseTemplates: 'pause-templates',
	WorkingConditions: 'working-conditions',
	ForecastCalculation: 'forecast-calculation',
} as const;

export type WfmSections = (typeof WfmSections)[keyof typeof WfmSections];
