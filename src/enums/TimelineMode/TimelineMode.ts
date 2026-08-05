export const TimelineMode = {
	Contact: 'contact',
	Case: 'case',
} as const;

export type TimelineMode = (typeof TimelineMode)[keyof typeof TimelineMode];
