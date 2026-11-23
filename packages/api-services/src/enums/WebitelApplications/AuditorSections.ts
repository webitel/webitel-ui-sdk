export const AuditorSections = {
	Scorecards: 'scorecards',
	Interactions: 'interactions',
} as const;

export type AuditorSections =
	(typeof AuditorSections)[keyof typeof AuditorSections];
